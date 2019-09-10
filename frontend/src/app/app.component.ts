import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ScoresApiService} from './scores/scores-api.service';
import {Score} from './scores/score.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.formpage.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';
  scoresListSubs: Subscription;
  scoresList: Score[];
  
  constructor(private scoresApi: ScoresApiService){
  }
  
  ngOnInit() {
	 /** this.scoresListSubs = this.scoresApi
	  .calculateScore("")
	  .subscribe(res => {
		  this.scoresList = res;
	  },
	  console.error
	  );
	  */
  }
  
  ngOnDestroy() {
	  //this.scoresListSubs.unsubscribe();
  }
}
