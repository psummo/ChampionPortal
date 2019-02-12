import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../models/team';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  static teamCache: Team[] = [];
  headers = { headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d' })};
  constructor(private http: HttpClient) { }

  getTeamById(idTeam: number): Observable<Team> {
    const url = 'https://api.football-data.org/v2/competitions/SA/matches?season=2018';
    return this.http.get(url, this.headers)
      .pipe(
        map( (response: any) => {
          const tmpTemp = Team.fromJson(response);
          /*CACHE TEAM INFO FOR NEXT SAME REQUEST*/
          TeamService.teamCache.push(tmpTemp);
          return tmpTemp;
          }
        )
      );
  }
}
