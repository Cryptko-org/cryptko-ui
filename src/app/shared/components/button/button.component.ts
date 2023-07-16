import { Component, Input } from '@angular/core';
import { ButtonData } from '../../../core/interfaces';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() buttonData: ButtonData;
}
