import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Match} from '../models/match';
import {map, delay, retryWhen} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
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
  headers = {headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d'})};

  constructor(private http: HttpClient, private localService: LocalStorageService) {
  }

  getMatchList(): Observable<Match[]> {
    MatchService.matchCache = this.convertToMatchArray(this.localService.retriveDaysMatches());
    if (MatchService.matchCache.length === 0) {
      const url = 'https://api.football-data.org/v2/competitions/SA/matches?season=2018';

      return this.http.get(url, this.headers)
        .pipe(
          map(
            (response: any[]) => {
              this.localService.initializeLocalStorage('matchArray', response[Attributes.matches]);
              return response[Attributes.matches].map((matchJson) => {
                const matchTmp = Match.fromJson(matchJson);
                // CACHE SOME INFO OF TEAMs
                MatchService.matchCache.push(matchTmp);
                return matchTmp;
              });
            }
          ),
          retryWhen(errors => errors.pipe(
            delay(2000)
          ))
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
        ),
        retryWhen(errors => errors.pipe(
          delay(2000)
        ))
      );
  }

  convertToMatchArray(jsonMatches: any): Match[] {
    const matchArray: Match[] = [];
    for (const match of jsonMatches) {
      matchArray.push(Match.fromJson(match));
    }
    return matchArray;
  }
}
