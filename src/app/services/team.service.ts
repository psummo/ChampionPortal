import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../models/team';
import {Observable, of} from 'rxjs';
import {delay, map, retryWhen} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';

enum AttributesTeam {
  teams = 'teams',
  squad = 'squad',
  activeCompetitions = 'activeCompetitions'
}

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  static teamCache: Team[] = [];
  headers = {headers: new HttpHeaders({'X-Auth-Token': '7b5abcb291ec4fd194fe07b26b80936d'})};

  constructor(private http: HttpClient, private localCacheService: LocalStorageService) {
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
              tmpTeam.squad = Team.addSquad(response[AttributesTeam.squad]);
              tmpTeam.activeCompetition = Team.addCompetitions(response[AttributesTeam.activeCompetitions]);
              TeamService.teamCache.push(tmpTeam);
              this.localCacheService.addInfoTeam(tmpTeam);
              return tmpTeam;
            } else if (retrieveOtherInfo && !retrieveAllInfo) {
              const index = TeamService.teamCache.indexOf(retrieveTeam);
              TeamService.teamCache[index].squad = Team.addSquad(response[AttributesTeam.squad]);
              TeamService.teamCache[index].activeCompetition = Team.addCompetitions(response[AttributesTeam.activeCompetitions]);
              this.localCacheService.addInfoTeam(TeamService.teamCache[index]);
              return TeamService.teamCache[index];
            }
          }
        ),
        retryWhen(errors => errors.pipe(
          delay(2000)
        ))
      );
  }

  // GET PARTIAL INFO ABOUT TEAMs ON STARTUP
  getAllTeam(): Observable<Team[]> {
    TeamService.teamCache = this.convertToTeamArray(this.localCacheService.retriveInfoTeams());
    if (TeamService.teamCache.length === 0) {
      const url = 'https://api.football-data.org/v2/competitions/SA/teams';
      return this.http.get(url, this.headers)
        .pipe(
          map((response: any[]) => {
              // SAVE IN LOCAL STORAGE
              this.localCacheService.initializeLocalStorage('teamArray', response[AttributesTeam.teams]);
              return response[AttributesTeam.teams].map((teamJson) => {
                const tmpTeam = Team.fromJson(teamJson);
                // CACHE SOME INFO OF TEAMs
                TeamService.teamCache.push(tmpTeam);
                return tmpTeam;
              });
            }
          ), retryWhen(errors => errors.pipe(
            delay(2000)
          ))
        );
    } else {
      return of(TeamService.teamCache);
    }
  }

  convertToTeamArray(jsonTeams: any): Team[] {
    const teamArray: Team[] = [];
    for (const team of jsonTeams) {
      teamArray.push(Team.fromJson(team));
    }
    return teamArray;
  }
}

