import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
})
export class CardContainerComponent {
  @Input() title = null;
}
