import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Score} from './score.model';
import {Router} from '@angular/router';
import {ScoresApiService} from './scores-api.service';
import {TransferService} from '../transfer.service';

@Component({
  selector: 'score',
  template: `
    <div>
      <button routerLink="/">Back</button>
      <ul *ngIf="scoresList">
        <li>
		{{scoresList.score}}, {{scoresList.category}}
        </li>
      </ul>
    </div>
  `
})
export class ScoresComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  scoresList: Score;

  constructor(private scoresApi: ScoresApiService, private transferService: TransferService, private router: Router) {
	  this.subscription = this.transferService.getData()
	  .subscribe(data => this.scoresList = data as Score);
	  
        
  }

  ngOnInit() {
	  console.log(typeof(this.scoresList));
	  console.log(this.scoresList);
	  /**
	  let temp = this.transferService.getData();
	  let score = new Score(temp[0], temp[1]);
	  this.scoresList[0] = score;
	  
	  this.transferService.dataMethod$.subscribe(
		data => this.scoresList = data,
		);
		*/
  }

  ngOnDestroy() {
	  this.subscription.unsubscribe();
  }
}