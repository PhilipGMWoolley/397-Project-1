import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from './env';
import {Score} from './scores/score.model';
import {Input} from './inputs/input.model';
import {Subject} from 'rxjs';

@Injectable()
export class TransferService {
	private data = new Subject<Score>();

  constructor(private http: HttpClient) {
	  //this.dataMethod$ = this.dataMethodSubject.asObservable();
  }
  
  getData(): Observable<Score> {
	  return this.data.asObservable();
  }
  
  dataMethod(data: Score){
	  console.log(data instanceof Score);
	  console.log(data);
	  this.data.next(data);
  }

}