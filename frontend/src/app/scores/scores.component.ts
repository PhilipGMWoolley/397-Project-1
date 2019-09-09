import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Score} from './score.model';
import {ScoresApiService} from './scores-api.service';

@Component({
  selector: 'score',
  template: `
    <div>
      <button routerLink="/">Back</button>
      <ul>
        <li *ngFor="let score of scoresList">

        </li>
      </ul>
    </div>
  `
})
export class ScoresComponent implements OnInit, OnDestroy {
  scoresListSubs: Subscription;
  scoresList: Score[];

  constructor(private scoresApi: ScoresApiService) {
  }

  ngOnInit() {
    this.scoresListSubs = this.scoresApi
      .calculateScore(null)
      .subscribe(res => {
          this.scoresList = res;
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.scoresListSubs.unsubscribe();
  }
}