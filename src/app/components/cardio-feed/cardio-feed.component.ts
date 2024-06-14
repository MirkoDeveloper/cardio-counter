import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CardioFeed } from 'src/app/interfaces/cardio-feed.interface';
import { CardioService } from 'src/app/services/cardio.service';

@Component({
  selector: 'app-cardio-feed',
  templateUrl: './cardio-feed.component.html',
})
export class CardioFeedComponent implements OnInit {
  private destroy$ = new Subject<void>();

  cardioFeedList: CardioFeed[] = [];

  constructor(private cardioService: CardioService) {}

  loadCardioFeed() {
    const storedCardioFeed = localStorage.getItem('cardioFeed');
    if (storedCardioFeed) {
      this.cardioFeedList = JSON.parse(storedCardioFeed);

      // Ordina l'array dal più recente al più vecchio
      this.cardioFeedList.sort((a, b) => {
        // Converte le stringhe di data in oggetti Date per il confronto
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime(); // Ordine decrescente
      });
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

  onDelete(index: number) {
    this.cardioFeedList.splice(index, 1);
    localStorage.setItem('cardioFeed', JSON.stringify(this.cardioFeedList));
    this.cardioService.updateCardioFeed();
  }
}
