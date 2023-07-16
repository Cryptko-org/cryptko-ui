import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortOption } from '../../../../core/interfaces';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  @Input() title: string = '';
  @Input() options: SortOption[] = [];
  @Output() optionsChange: EventEmitter<string> = new EventEmitter<string>();

  public isOpen: boolean = false;

  public handlePopoverOpen() {
    this.isOpen = !this.isOpen;
  }

  public closePopover() {
    this.isOpen = false;
  }

  public selectOption(value: string) {
    this.optionsChange.emit(value);
    this.closePopover();
  }
}
