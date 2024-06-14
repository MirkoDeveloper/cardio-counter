import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card-container-header',
  templateUrl: './card-container-header.component.html',
})
export class CardContainerHeaderComponent {
  @HostBinding('class') class = 'w-full';

  @Input() title: string = '';
}
