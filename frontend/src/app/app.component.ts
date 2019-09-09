import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ScoresApiService} from './scores/scores-api.service';
import {Score} from './scores/score.model';

@Component({
  selector: 'app-root',
  template: './app.formpage.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';
  scoresListSubs: Subscription;
  scoresList: Score[];
  
  constructor(private scoresApi: ScoresApiService){
  }
  
  ngOnInit() {
	  this.scoresListSubs = this.scoresApi
	  .getScores()
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
