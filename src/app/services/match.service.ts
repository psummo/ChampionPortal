import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Match} from '../models/match';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  headers = { headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d' })};
  constructor(private http: HttpClient) { }

  getMatchList(): Observable<Match[]> {
    const url = 'https://api.football-data.org/v2/competitions/SA/matches?season=2018';

    return this.http.get(url, this.headers)
      .pipe(
        map(
          (response: any[]) => {
            return response['matches'].map(matchJson => Match.fromJson(matchJson));
          }
        )
      );
  }

  getMatchById(idMatch: number): Observable<Match> {
    const url = `http://staging-api.football-data.org/v2/matches/${idMatch}`;
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (response: any) => { return Match.fromJson(response);
          }
        )
      );
  }
}
