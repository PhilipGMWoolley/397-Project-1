import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScoresApiService} from "../scores/scores-api.service";
import {TransferService} from "../transfer.service";
import {Input} from "./input.model"
import {Score} from "../scores/score.model"
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
  input = new Input(null, null, null, null, null);

  constructor(private scoresApi: ScoresApiService, private router: Router,
  private transferService: TransferService) { }

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
	let temp = new Score(0, "");
    this.scoresApi
      .calculateScore(this.input)
      .subscribe(
        res => 
		{
		temp.score = res["Score"] as number;
		console.log(temp.score);
		temp.category = res["Category"];
		this.transferService.dataMethod(temp);
		},
      );
	this.router.navigate(['/', 'score']);
  }
}