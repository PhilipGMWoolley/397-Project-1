import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import {Score} from './score.model';
import {Input} from '../inputs/input.model';

@Injectable()
export class ScoresApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }


  
  calculateScore(input: Input): Observable<any> {
	  return this.http
	  .post(`${API_URL}/score`, input);
  }
}