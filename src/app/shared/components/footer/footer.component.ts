import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public socials = [
    {
      name: 'Telegram',
      link: 'https://t.me/d0nnle',
      iconClass: 'icon-telegram',
    },
  ];
}
