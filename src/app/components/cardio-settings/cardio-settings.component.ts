import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { CardioSettings } from 'src/app/interfaces/cardio-settings.interface';
import { CardioService } from 'src/app/services/cardio.service';

@Component({
  selector: 'app-cardio-settings',
  templateUrl: './cardio-settings.component.html',
})
export class CardioSettingsComponent {
  @HostBinding('class') class = 'w-full';

  cardioMins: number | null = null;
  cardioDay: Date | null = null;
  cardioSettings: CardioSettings = {} as CardioSettings;

  constructor(private router: Router, private cardioService: CardioService) {}

  onSubmit() {
    if (this.cardioMins !== null || this.cardioDay !== null) {
      const existingCardioSettings = JSON.parse(
        localStorage.getItem('cardioSettings') as string
      );

      const newCardioSettings: CardioSettings = {
        minutes: this.cardioMins
          ? this.cardioMins
          : existingCardioSettings.minutes,
        startDate: this.cardioDay
          ? this.cardioDay
          : existingCardioSettings.startDate,
      };

      this.cardioSettings = newCardioSettings;

      localStorage.setItem(
        'cardioSettings',
        JSON.stringify(this.cardioSettings)
      );
      this.cardioService.updateCardioSettings();

      this.navigateToHome();
    }
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
}
