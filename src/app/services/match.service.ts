import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Match} from '../models/match';
import {map} from 'rxjs/operators';
import {Team} from '../models/team';
import {Headtohead} from '../models/headtohead';

enum Attributes {
  matches = 'matches',
  head2head = 'head2head',
  match = 'match'
}

@Injectable({
  providedIn: 'root'
})

export class MatchService {

  static matchCache: Match[] = [];
  matchPerDay = new Array<number>();
  headers = { headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d' })};
  constructor(private http: HttpClient) { }

  getMatchList(): Observable<Match[]> {

    if (MatchService.matchCache.length === 0) {
      const url = 'https://api.football-data.org/v2/competitions/SA/matches?season=2018';

      return this.http.get(url, this.headers)
        .pipe(
          map(
            (response: any[]) => {
              return response[Attributes.matches].map((matchJson) => {
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

  getMatchById(idMatch: number): Observable<any[]> {
    const url = `http://api.football-data.org/v2/matches/${idMatch}`;
    const tmpObj: any[] = [];
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (response: any) => {
            tmpObj.push(Headtohead.fromJson(response[Attributes.head2head]), Match.fromJson(response[Attributes.match]));
            console.log('Response match getMatchById->', tmpObj);
            return tmpObj;
          }
        )
      );
  }
}
