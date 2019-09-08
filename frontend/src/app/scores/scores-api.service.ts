import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import {Score} from './score.model';

@Injectable()
export class ScoresApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getScores(): Observable<Score[]> {
    return this.http
      .get<Score[]>(`${API_URL}/score`)
      .catch(ScoresApiService._handleError);
  }
}