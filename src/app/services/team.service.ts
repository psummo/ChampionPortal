import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../models/team';
import {ObjectUnsubscribedError, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  static teamCache: Team[] = [];
  headers = { headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d' })};

  constructor(private http: HttpClient) { }

  // GET INFO ABOUT A SINGLE TEAM
  getTeamById(idTeam: number): Observable<Team> {
    const url = `https://api.football-data.org/v2/teams/${idTeam}`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (response: any) => {
            // RETRIVE TEAM TO ADD INFORMATION
            for (const team of TeamService.teamCache) {
              if (team.id === idTeam) {
                team.squad = Team.addSquad(response['squad']);
                team.activeCompetition = Team.addCompetitions(response['activeCompetitions']);
              }
            }
            const tmpTemp = Team.fromJson(response);
            return tmpTemp;
          }
        )
      );
  }

  // GET PARTIAL INFO ABOUT TEAMs ON STARTUP
  getAllTeam(): Observable<Team[]> {
    if (TeamService.teamCache.length === 0) {
      const url = 'https://api.football-data.org/v2/competitions/SA/teams';
      return this.http.get(url, this.headers)
        .pipe(
          map((response: any[]) => {
              return response['teams'].map((teamJson) => {
                const teamTmp = Team.fromJson(teamJson);
                // CACHE SOME INFO OF TEAMs
                TeamService.teamCache.push(teamJson);
                return teamTmp;
              });
            }
          )
        );
    } else {
      console.log("TEAM CACHE");
      TeamService.teamCache.map((team) => {
        return team;
      });
    }
  }
}
