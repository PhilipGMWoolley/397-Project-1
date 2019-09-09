import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {ScoresApiService} from './scores/scores-api.service';
import {ScoreComponent} from './scores/scores.component';
import {InputComponent} from './inputs/input.component';

const appRoutes: Routes = [
	{path: 'score', component: ScoreComponent},
	{path: '', component: InputComponent},
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	RouterModule.forRoot(
		appRoutes,
	),
  ],
  providers: [ScoresApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
