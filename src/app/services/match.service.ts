import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Match} from '../models/match';
import {map} from 'rxjs/operators';
import {Team} from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  static matchCache: Match[] = [];
  headers = { headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d' })};
  constructor(private http: HttpClient) { }

  getMatchList(): Observable<Match[]> {

    if (MatchService.matchCache.length === 0) {
      const url = 'https://api.football-data.org/v2/competitions/SA/matches?season=2018';

      return this.http.get(url, this.headers)
        .pipe(
          map(
            (response: any[]) => {
              return response['matches'].map((matchJson) => {
                console.log(response);

                const matchTmp = Match.fromJson(matchJson);
                // CACHE SOME INFO OF TEAMs
                MatchService.matchCache.push(matchTmp);
                return matchTmp;
              });
            }
          )
        );
    } else {
      return of(MatchService.matchCache);
    }
  }

  getMatchById(idMatch: number): Observable<Match> {
    const url = `http://api.football-data.org/v2/matches/${idMatch}`;
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (response: any) => { return Match.fromJson(response);
          }
        )
      );
  }
}
