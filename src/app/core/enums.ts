export enum METAMASK_METHODS {
  ETH_ACCOUNTS = 'eth_accounts',
  ETH_REQUEST_ACCOUNTS = 'eth_requestAccounts',
  ETH_BLOCK_NUMBER = 'eth_blockNumber',
  ETH_CALL = 'eth_call',
  ETH_CHAIN_ID = 'eth_chainId',
  ETH_COINBASE = 'eth_coinbase',
  ETH_DECRYPT = 'eth_decrypt',
  ETH_ESTIMATE_GAS = 'eth_estimateGas',
  ETH_FEE_HISTORY = 'eth_feeHistory',
  ETH_GAS_PRICE = 'eth_gasPrice',
  ETH_GET_BALANCE = 'eth_getBalance',
  ETH_GET_BLOCK_BY_HASH = 'eth_getBlockByHash',
  ETH_GET_BLOCK_BY_NUMBER = 'eth_getBlockByNumber',
  ETH_GET_BLOCK_TRANSACTION_COUNT_BY_HASH = 'eth_getBlockTransactionCountByHash',
  ETH_GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER = 'eth_getBlockTransactionCountByNumber',
  ETH_GET_CODE = 'eth_getCode',
  ETH_GET_ENCRYPTION_PUBLIC_KEY = 'eth_getEncryptionPublicKey',
  ETH_GET_FILTER_CHANGES = 'eth_getFilterChanges',
  ETH_GET_FILTER_LOGS = 'eth_getFilterLogs',
  ETH_GET_LOGS = 'eth_getLogs',
  ETH_GET_PROOF = 'eth_getProof',
  ETH_GET_STORAGE_AT = 'eth_getStorageAt',
  ETH_GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX = 'eth_getTransactionByBlockHashAndIndex',
  ETH_GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX = 'eth_getTransactionByBlockNumberAndIndex',
  ETH_GET_TRANSACTION_BY_HASH = 'eth_getTransactionByHash',
  ETH_GET_TRANSACTION_COUNT = 'eth_getTransactionCount',
  ETH_GET_TRANSACTION_RECEIPT = 'eth_getTransactionReceipt',
  ETH_GET_UNCLE_COUNT_BY_BLOCK_HASH = 'eth_getUncleCountByBlockHash',
  ETH_GET_UNCLE_COUNT_BY_BLOCK_NUMBER = 'eth_getUncleCountByBlockNumber',
  ETH_GET_WORK = 'eth_getWork',
  ETH_HASHRATE = 'eth_hashrate',
  ETH_MAX_PRIORITY_FEE_PER_GAS = 'eth_maxPriorityFeePerGas',
  ETH_MINING = 'eth_mining',
  ETH_NEW_BLOCK_FILTER = 'eth_newBlockFilter',
  ETH_NEW_FILTER = 'eth_newFilter',
  ETH_NEW_PENDING_TRANSACTION_FILTER = 'eth_newPendingTransactionFilter',
  ETH_SEND_RAW_TRANSACTION = 'eth_sendRawTransaction',
  ETH_SEND_TRANSACTION = 'eth_sendTransaction',
  ETH_SIGN_TYPED_DATA_V4 = 'eth_signTypedData_v4',
  ETH_SUBMIT_HASHRATE = 'eth_submitHashrate',
  ETH_SUBMIT_WORK = 'eth_submitWork',
  ETH_SUBSCRIBE = 'eth_subscribe',
  ETH_SYNCING = 'eth_syncing',
  ETH_UNINSTALL_FILTER = 'eth_uninstallFilter',
  ETH_UNSUBSCRIBE = 'eth_unsubscribe',
  PERSONAL_SIGN = 'personal_sign',
  WALLET_ADD_ETHEREUM_CHAIN = 'wallet_addEthereumChain',
  WALLET_GET_PERMISSIONS = 'wallet_getPermissions',
  WALLET_REGISTER_ON_BOARDING = 'wallet_registerOnboarding',
  WALLET_REQUEST_PERMISSIONS = 'wallet_requestPermissions',
  WALLET_SWITCH_ETHEREUM_CHAIN = 'wallet_switchEthereumChain',
  WALLET_WATCH_ASSET = 'wallet_watchAsset',
}

export enum METAMASK_LISTENERS {
  ACCOUNTS_CHANGED = 'accountsChanged',
  CHAIN_CHANGED = 'chainChanged',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
}

export enum ORDER_STATUSES {
  PENDING = 'PENDING',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

export enum BUTTON_SIZES {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  WIDE = 'wide',
}

export enum BUTTON_TYPES {
  BLACK_BORDER_TRANSPARENT = 'black-border-transparent',
  GRAY = 'gray',
  RED = 'red',
}

export enum PHONES_ID {
  IPHONE_14_PRO_MAX = 'iPhone 14 Pro Max',
  IPHONE_14_PRO = 'iPhone 14 Pro',
  IPHONE_14_PLUS = 'iPhone 14 Plus',
  IPHONE_14 = 'iPhone 14',
  IPHONE_13_PRO_MAX = 'iPhone 13 Pro Max',
  IPHONE_13_PRO = 'iPhone 13 Pro',
  IPHONE_13_MINI = 'iPhone 13 Mini',
  IPHONE_13 = 'iPhone 13',
  IPHONE_12_PRO_MAX = 'iPhone 12 Pro Max',
  IPHONE_12_PRO = 'iPhone 12 Pro',
  IPHONE_12_MINI = 'iPhone 12 Mini',
  IPHONE_12 = 'iPhone 12',
  IPHONE_11_PRO_MAX = 'iPhone 11 Pro Max',
  IPHONE_11_PRO = 'iPhone 11 Pro',
  IPHONE_11 = 'iPhone 11',
  IPHONE_XR = 'iPhone XR',
  IPHONE_XS_MAX = 'iPhone XS Max',
  IPHONE_XS = 'iPhone XS',
  IPHONE_X = 'iPhone X',
  IPHONE_SE_2022 = 'iPhone SE 2022',
  IPHONE_SE_2020 = 'iPhone SE 2020',
  IPHONE_SE = 'iPhone SE',
  IPHONE_8_PLUS = 'iPhone 8 Plus',
  IPHONE_8 = 'iPhone 8',
  IPHONE_7_PLUS = 'iPhone 7 Plus',
  IPHONE_7 = 'iPhone 7',
}

export enum MEMORY_ID {
  '32GB' = '32 GB',
  '64GB' = '64 GB',
  '128GB' = '128 GB',
  '256GB' = '256 GB',
  '512GB' = '512 GB',
  '1TB' = '1 TB',
}

export enum STATUS_ID {
  USED = 'Вживаний',
  NOT_USED = 'Новий',
}

export enum PRODUCT_FILTERS {
  MODEL = 'model$',
  MEMORY = 'memory$',
  STATUS = 'status$',
}

export enum PRODUCTS_SORTS {
  NOT_SORT = 'Не сортувати',
  HIGH_PRICE_FIRST = 'Вища ціна спочатку',
  LOW_PRICE_FIRST = 'Нижча ціна спочатку',
  HIGH_STARS_FIRST = 'Вища оцінка спочатку',
  LOW_STARS_FIRST = 'Нижча оцінка спочатку',
}

export enum MODAL_IDS {
  BUY_PRODUCT = 'buyProductModal',
}
