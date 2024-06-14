import { Component, HostBinding, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CardioFeed } from 'src/app/interfaces/cardio-feed.interface';
import { CardioService } from 'src/app/services/cardio.service';

@Component({
  selector: 'app-add-cardio',
  templateUrl: './add-cardio.component.html',
})
export class AddCardioComponent implements OnInit {
  @HostBinding('class') class = 'w-full';

  private destroy$ = new Subject<void>();

  cardioMins: number | null = null;
  cardioDate: Date | null = null;
  cardioFeed: CardioFeed[] = [];

  constructor(private cardioService: CardioService) {}

  onSubmit() {
    if (this.cardioMins && this.cardioDate) {
      const newCardio: CardioFeed = {
        date: this.cardioDate,
        minutes: this.cardioMins,
      };

      this.cardioFeed.push(newCardio);

      localStorage.setItem('cardioFeed', JSON.stringify(this.cardioFeed));
      this.cardioService.updateCardioFeed();
    }

    this.cardioMins = null;
    this.cardioDate = null;
  }

  loadCardioFeed() {
    const storedCardioFeed = localStorage.getItem('cardioFeed');
    if (storedCardioFeed) {
      this.cardioFeed = JSON.parse(storedCardioFeed);
    }
  }

  ngOnInit(): void {
    this.loadCardioFeed();

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
