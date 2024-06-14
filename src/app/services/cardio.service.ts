import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardioService {
  private cardioFeedUpdated = new Subject<void>();
  private cardioSettings = new Subject<void>();

  getCardioFeedUpdatedListener() {
    return this.cardioFeedUpdated.asObservable();
  }

  updateCardioFeed() {
    this.cardioFeedUpdated.next();
  }

  getCardioSettingsListener() {
    return this.cardioSettings.asObservable();
  }

  updateCardioSettings() {
    this.cardioSettings.next();
  }
}
