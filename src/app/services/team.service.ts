import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../models/team';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  static teamCache: Team[] = [];
  headers = {headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d'})};

  constructor(private http: HttpClient) {
  }

  // GET INFO ABOUT A SINGLE TEAM
  getTeamById(idTeam: number): Observable<Team> {
    const url = `https://api.football-data.org/v2/teams/${idTeam}`;
    let retrieveOtherInfo = true;
    let retrieveAllInfo = true;
    let retrieveTeam: Team = null;
    // CHECK IF THERE ARE ALREADY INFO ABOUT TEAM IN ARRAY/CACHE
    for (const team of TeamService.teamCache) {
      if (team.id === idTeam && team.squad.length > 0) {
        retrieveAllInfo = false;
        retrieveOtherInfo = false;
        retrieveTeam = team;
      } else if (team.id === idTeam && team.squad.length === 0) {
        retrieveAllInfo = false;
        retrieveTeam = team;
      }
    }
    return this.http.get(url, this.headers)
      .pipe(
        map((response: any) => {

            if (retrieveAllInfo) {
              const tmpTeam = Team.fromJson(response);
              tmpTeam.squad = Team.addSquad(response['squad']);
              tmpTeam.activeCompetition = Team.addCompetitions(response['activeCompetitions']);
              TeamService.teamCache.push(tmpTeam);
              return tmpTeam;
            } else if (retrieveOtherInfo && !retrieveAllInfo) {
              const index = TeamService.teamCache.indexOf(retrieveTeam);
              TeamService.teamCache[index].squad = Team.addSquad(response['squad']);
              TeamService.teamCache[index].activeCompetition = Team.addCompetitions(response['activeCompetitions']);
              return TeamService.teamCache[index];
            }
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
                TeamService.teamCache.push(teamTmp);
                return teamTmp;
              });
            }
          )
        );
    } else {
      return of(TeamService.teamCache);
    }
  }
}
