import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import MetaMaskSDK from '@metamask/sdk';
import detectEthereumProvider from '@metamask/detect-provider';
import { METAMASK_LISTENERS, METAMASK_METHODS } from '../enums';
import {
  AddChainData,
  Metamask,
  MetamaskError,
  NativeCurrencyData,
  WalletData,
} from '../interfaces';
import { EnvironmentService } from './environment.service';
import { ToastrService } from 'ngx-toastr';

/**
 * This service was created for work with bnb on BSC Mainnet/Testnet chain
 * */

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  private readonly METAMASK_POLLING_TIME: number = 1000 * 10; // 10s
  private readonly REQUIRED_CHAIN_ID: string = this.environmentService.environment.requiredChainId;

  private metamask: Metamask;

  public walletData: WalletData = {
    address$: new BehaviorSubject(''),
    balance: 0,
    activeChainId$: new BehaviorSubject<string>('0x0'),
    isHaveRequiredChain: false,
    isMetamask: false,
    isWalletConnected: false,
    isActiveChainIdCorrect: false,
  };

  constructor(
    private environmentService: EnvironmentService,
    private toastrService: ToastrService
  ) {
    const MMSDK: MetaMaskSDK = new MetaMaskSDK();
    this.metamask = MMSDK.getProvider();

    this.isWalletConnected().then(() => {
      this.initWalletData()
        .then(() => {
          this.toastrService.success("Гаманець успішно під'єднано!");
          console.log('Wallet data has been inited successfully!');
        })
        .catch((err) => {
          console.log('Something went wrong while wallet data init:', err.message);
        })
        .finally(() => {
          this.metamaskPolling();
        });
    });

    this.addMetamaskEventListeners();
  }

  public get activeChainId() {
    return this.walletData.activeChainId$.getValue();
  }

  public set activeChainId(chainId: string) {
    this.walletData.activeChainId$.next(chainId);
    this.walletData.isActiveChainIdCorrect = chainId === this.REQUIRED_CHAIN_ID;

    if (this.walletData.isActiveChainIdCorrect && !this.walletData.isHaveRequiredChain) {
      this.walletData.isHaveRequiredChain = true;
    }
  }

  public get walletAddress(): string {
    return this.walletData.address$.getValue();
  }

  public set walletAddress(walletAddress: string) {
    this.walletData.address$.next(walletAddress);
  }

  public sendTransaction(
    value: number,
    from: string = this.walletAddress,
    to: string = this.environmentService.environment.sendToWalletAddress,
    gas: string = '0x5208'
  ): Promise<string> {
    return this.getGasPrice().then((gasPrice: string) => {
      return this.sendTransactionRequest(value, gasPrice, from, to, gas)
        .then((txhash: string) => {
          console.log('Transaction was successfully sent! Txhash:', txhash);
          return txhash;
        })
        .catch((err) => {
          console.log('Something went wrong while sending transaction! Error:', err.message);
          return '';
        });
    });
  }

  public async connectWallet(): Promise<boolean> {
    return this.metamask
      .request({ method: METAMASK_METHODS.ETH_REQUEST_ACCOUNTS })
      .then(() => {
        this.toastrService.success("Гаманець успішно під'єднано!");
        console.log('Wallet connected successfully!');
        return true;
      })
      .catch((err) => {
        if (err.code === 4001) {
          this.toastrService.error("Гаманець не під'єднано =(");
          console.log('You reject operation!');
        } else {
          this.toastrService.error('Щось пішло не так при підключені гаманця =(');
          console.log('Something went wrong while connect wallet!:', err.message);
        }

        return false;
      });
  }

  public switchChain(chainId: string = this.REQUIRED_CHAIN_ID): Promise<string> {
    return this.switchChainRequest(chainId)
      .then(() => {
        this.activeChainId = chainId;
        this.toastrService.success('Чейн успішно змінено!');
        console.log('Active chain switched! Current active chain:', this.activeChainId);
        return chainId;
      })
      .catch((err: MetamaskError) => {
        // Add chain if it doesn't exist
        if (err.code === 4902) {
          this.addChain().then(() => {
            this.switchChain(this.REQUIRED_CHAIN_ID).then(async () => {
              console.log('Active chain switched! Current active chain:', this.activeChainId);
            });
          });

          return '';
        }

        if (err.code === 4001) {
          this.toastrService.error('Чейн не змінено, ви відхилили операцію =(');
          console.log('You reject operation!');
        } else {
          console.log('Something went wrong while changing chain! Error: ', err.message);
        }

        return '';
      });
  }

  private sendTransactionRequest(
    rawValue: number,
    gasPrice: string,
    from: string,
    to: string,
    gas: string
  ): Promise<any> {
    const value: string = this.convertNumberToHexadecimalWEI(rawValue);

    return this.metamask.request({
      method: METAMASK_METHODS.ETH_SEND_TRANSACTION,
      params: [
        {
          value,
          gasPrice,
          from,
          to,
          gas,
        },
      ],
    });
  }

  private async initWalletData(): Promise<void> {
    this.walletData.isMetamask = await this.detectMetamaskWallet();
    if (!this.walletData.isMetamask) {
      this.toastrService.info('Будь ласка, завантажте метамаск!');
      throw Error('Please, download a metamask!');
    }

    this.walletData.isWalletConnected = await this.isWalletConnected();
    if (!this.walletData.isWalletConnected) {
      this.toastrService.info('Будь ласка, підключіть метамаск!');
      throw Error('Please, connect/install metamask and refresh page!');
    }

    await this.updateActiveChainId().then(() => {
      if (this.walletData.isActiveChainIdCorrect) {
        console.log('Chain connected successfully!');
      } else {
        console.log('Please, change your chain to BSC');
      }
    });

    await this.getWalletAddresses().then(async (walletAddresses: string[]) => {
      console.log('Wallet addresses:', walletAddresses);

      if (walletAddresses.length !== 0) {
        this.walletAddress = walletAddresses[0];
        await this.updateBalanceByWalletAddress(this.walletAddress);
      } else {
        console.log('Please, connect wallet from metamask!');
      }

      return walletAddresses;
    });
  }

  private metamaskPolling() {
    interval(this.METAMASK_POLLING_TIME).subscribe({
      next: async () => {
        await this.updateBalanceByWalletAddress(this.walletAddress);
      },
    });
  }

  private addChain(
    chainId: string = this.environmentService.environment.chainId,
    chainName: string = this.environmentService.environment.chainName,
    rpcUrls: string[] = this.environmentService.environment.rpcUrls,
    iconUrls: string[] = this.environmentService.environment.iconUrls,
    nativeCurrency: NativeCurrencyData = this.environmentService.environment.nativeCurrency,
    blockExplorerUrls: string[] = this.environmentService.environment.blockExplorerUrls
  ): Promise<boolean> {
    return this.addChainRequest(
      chainId,
      chainName,
      rpcUrls,
      iconUrls,
      nativeCurrency,
      blockExplorerUrls
    )
      .then(() => {
        this.toastrService.success('Необхідний чейн успішно додано!');
        console.log('Chain has been added successfully!');
        this.walletData.isHaveRequiredChain = true;

        return true;
      })
      .catch((err) => {
        this.walletData.isHaveRequiredChain = false;

        if (err.code === 4001) {
          this.toastrService.error('Ви відхилили операцію додавання необхідного чейну =(');
          console.log('You reject operation!');
        } else {
          this.toastrService.error('Щось пішло не так під час додавання необхідного чейну =(');
          console.log('Something went wrong while adding chain! Error: ', err.message);
        }

        return false;
      });
  }

  private addChainRequest(
    chainId: string,
    chainName: string,
    rpcUrls: string[],
    iconUrls: string[],
    nativeCurrency: NativeCurrencyData,
    blockExplorerUrls: string[]
  ): Promise<any> {
    const requiredChainData: AddChainData = {
      chainId,
      chainName,
      rpcUrls,
      iconUrls,
      nativeCurrency,
      blockExplorerUrls,
    };

    return this.metamask.request({
      method: METAMASK_METHODS.WALLET_ADD_ETHEREUM_CHAIN,
      params: [requiredChainData],
    });
  }

  private switchChainRequest(chainId: string = this.REQUIRED_CHAIN_ID): Promise<string> {
    return this.metamask.request({
      method: METAMASK_METHODS.WALLET_SWITCH_ETHEREUM_CHAIN,
      params: [
        {
          chainId,
        },
      ],
    });
  }

  private updateBalanceByWalletAddress(
    walletAddress: string = this.walletAddress
  ): Promise<number> {
    return this.getBalanceByWalletAddress(walletAddress)
      .then((rawBalance: string) => {
        const balance: number = this.convertHexadecimalWEIToNumber(rawBalance);
        this.walletData.balance = balance;

        console.log('Wallet balance refreshed! Current wallet balance:', this.walletData.balance);

        return balance;
      })
      .catch((err) => {
        console.log('Something went wrong while updating balance:', err.message);
        return 0;
      });
  }

  private updateActiveChainId(): Promise<string> {
    return this.getActiveChainId().then((activeChainId: string) => {
      this.activeChainId = activeChainId;

      console.log('Active chain id refreshed! Current active chain id:', this.activeChainId);

      return activeChainId;
    });
  }

  private getBalanceByWalletAddress(
    walletAddress: string,
    block: string = 'finalized'
  ): Promise<string> {
    return this.metamask.request({
      method: METAMASK_METHODS.ETH_GET_BALANCE,
      params: [walletAddress, block],
    });
  }

  private getGasPrice(): Promise<string> {
    return this.metamask
      .request({
        method: METAMASK_METHODS.ETH_GAS_PRICE,
        params: [],
      })
      .catch(() => {
        return 10000000000;
      });
  }

  private getWalletAddresses(): Promise<string[]> {
    return this.metamask.request({
      method: METAMASK_METHODS.ETH_ACCOUNTS,
      params: [],
    });
  }

  private getActiveChainId(): Promise<string> {
    return this.metamask.request({
      method: METAMASK_METHODS.ETH_CHAIN_ID,
      params: [],
    });
  }

  private isWalletConnected(): Promise<boolean> {
    return this.metamask
      .request({ method: METAMASK_METHODS.ETH_ACCOUNTS })
      .then((wallets): boolean => wallets.length > 0);
  }

  private async detectMetamaskWallet(): Promise<boolean> {
    return await detectEthereumProvider().then((data) => data.isMetaMask);
  }

  private addMetamaskEventListeners() {
    this.metamask.on(METAMASK_LISTENERS.ACCOUNTS_CHANGED, async (walletAddresses: string[]) => {
      this.toastrService.info('Ваш гаманець змінено!');
      console.log(`[METAMASK_EVENT] ${METAMASK_LISTENERS.ACCOUNTS_CHANGED}:`, walletAddresses);
      await this.initWalletData();
    });

    this.metamask.on(METAMASK_LISTENERS.CHAIN_CHANGED, (activeChainId) => {
      console.log(`[METAMASK_EVENT] ${METAMASK_LISTENERS.CHAIN_CHANGED}:`, activeChainId);
      this.activeChainId = activeChainId;
    });
  }

  private convertNumberToHexadecimalWEI(value: number): string {
    return `0x${BigInt(Math.ceil(value * 10 ** 18)).toString(16)}`;
  }

  private convertHexadecimalWEIToNumber(value: string): number {
    return Number(value) / 10 ** 18;
  }
}
