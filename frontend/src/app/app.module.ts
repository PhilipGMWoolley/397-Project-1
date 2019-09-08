import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {ScoresApiService} from './scores/scores-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
  ],
  providers: [ScoresApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
