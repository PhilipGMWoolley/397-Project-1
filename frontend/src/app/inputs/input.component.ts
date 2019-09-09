import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScoresApiService} from "./scores-api.service";
import {Input} from "./input.model"
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>New Exam</h2>
      <label for="Cytogenetics">Cytogenetics</label>
      <input id="Cytogenetics" (keyup)="updateCytogenetics($event)">
	  <label for="BM-Blast">BM-Blast</label>
      <input id="BM-Blast" (keyup)="updateBMBlast($event)">
	  <label for="Hemoglobin">Hemoglobin</label>
      <input id="Hemoglobin" (keyup)="updateHemoglobin($event)">
	  <label for="Platelets">Platelets</label>
      <input id="Platelets" (keyup)="updatePlatelets($event)">
	  <label for="Anc">Absolute Neutrophil Count</label>
      <input id="Anc" (keyup)="updateAnc($event)">
	  <button (click)="calculateScore()">Calculate Score</button>
    </div>
  `
})
export class InputComponent {
  input = Input(void, void, void, void, void);

  constructor(private scoresApi: ScoresApiService, private router: Router) { }

  updateCytogenetics(event: any) {
    this.input.cytogenetics = event.target.value;
  }

  updateBMBlast(event: any) {
    this.input.bm_blast = event.target.value;
  }
  
  updateHemoglobin(event: any) {
	this.input.hemoglobin = event.target.value;
  }
  
  updatePlatelets(event: any) {
	this.input.platelets = event.target.value;
  }
  
  updateAnc(event: any) {
	this.input.anc = event.target.value;
  }

  calculateScore() {
    this.scoresApi
      .calculateScore(this.input)
      .subscribe(
        () => this.router.navigate(['/score']),
        error => alert(error.message)
      );
  }
}