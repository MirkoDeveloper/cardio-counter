import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardioService } from 'src/app/services/cardio.service';
import { CardioSettings } from './../../interfaces/cardio-settings.interface';
import { CardioFeed } from './../../interfaces/cardio-feed.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private cardioService: CardioService) {}

  private destroy$ = new Subject<void>();

  cardioFeed: CardioFeed[] = [];
  cardioSettings = {} as CardioSettings;

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  get cardioWeeklyMinutes(): number {
    let totalMinutes = 0;

    // Assicurati che cardioSettings.startDate sia definito
    if (!this.cardioSettings.startDate) {
      return totalMinutes;
    }

    const startDate = new Date(this.cardioSettings.startDate);
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    let startDayOfWeek = startDate.getDay();

    // Calcola la differenza in giorni dal giorno di inizio settimana
    let daysToSubtract =
      currentDayOfWeek >= startDayOfWeek
        ? currentDayOfWeek - startDayOfWeek
        : 7 - (startDayOfWeek - currentDayOfWeek);

    // Calcola la data di inizio settimana
    let weekStartDate = new Date(today);
    weekStartDate.setDate(today.getDate() - daysToSubtract);
    weekStartDate.setHours(0, 0, 0, 0);

    // Calcola la data di fine settimana aggiungendo 6 giorni alla data di inizio settimana
    let weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
    weekEndDate.setHours(23, 59, 59, 999);

    // Filtra cardioFeed per le date comprese tra weekStartDate e weekEndDate
    this.cardioFeed.forEach((feedItem) => {
      const feedDate = new Date(feedItem.date);
      if (feedDate >= weekStartDate && feedDate <= weekEndDate) {
        totalMinutes += feedItem.minutes;
      }
    });

    return totalMinutes;
  }

  loadCardioSettings() {
    const storedCardioSettings = localStorage.getItem('cardioSettings');

    if (storedCardioSettings) {
      this.cardioSettings = JSON.parse(storedCardioSettings);

      if (this.cardioSettings.startDate) {
        // Converti la stringa salvata in un oggetto Date
        const selectedDayOfWeek = new Date(
          this.cardioSettings.startDate
        ).getDay();
        const today = new Date();
        const currentDayOfWeek = today.getDay();
        let daysToSubtract;

        if (currentDayOfWeek >= selectedDayOfWeek) {
          // Se il giorno selezionato è già passato questa settimana, o è oggi
          daysToSubtract = currentDayOfWeek - selectedDayOfWeek;
        } else {
          // Se il giorno selezionato è ancora avanti questa settimana
          daysToSubtract = 7 - (selectedDayOfWeek - currentDayOfWeek);
        }

        // Calcola startDate sottraendo i giorni
        let startDate = new Date(today);
        startDate.setDate(today.getDate() - daysToSubtract);

        // Imposta l'ora a mezzanotte per iniziare il giorno
        startDate.setHours(0, 0, 0, 0);

        // Calcola endDate aggiungendo 7 giorni a startDate
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);

        // Ajusta endDate per farlo terminare alle 23:59 dello stesso giorno
        endDate.setHours(23, 59, 59, 999);

        this.cardioSettings.startDate = startDate;
      }
    }
  }

  loadCardioFeed() {
    const storedCardioFeed = localStorage.getItem('cardioFeed');

    if (storedCardioFeed) {
      this.cardioFeed = JSON.parse(storedCardioFeed);
    }
  }

  ngOnInit(): void {
    this.loadCardioSettings();
    this.loadCardioFeed();

    this.cardioService
      .getCardioFeedUpdatedListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadCardioSettings();
      });

    this.cardioService
      .getCardioFeedUpdatedListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadCardioFeed();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
