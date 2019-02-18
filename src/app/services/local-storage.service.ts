import {Injectable} from '@angular/core';
import {Team} from '../models/team';
import {Match} from '../models/match';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  // FIND TEAM IN LOCALSTORAGE ARRAY AND UPDATE IT
  addInfoTeam(team: Team) {
    if (localStorage.getItem('teamArray')) {
      const jsonTeam = JSON.parse(localStorage.getItem('teamArray')) as Array<Team>;
      let findTeam = false;
      const indexElem = jsonTeam.findIndex(x => x.id === team.id);
      if (indexElem > -1) {
        findTeam = true;
        jsonTeam[indexElem] = team;
        return;
      } else {
        jsonTeam.push(team);
      }
      localStorage.setItem('teamArray', JSON.stringify(jsonTeam));
    }
  }

  // FIND MATCH IN LOCALSTORAGE ARRAY AND UPDATE IT
  addInfoMatch(match: Match) {
    if (localStorage.getItem('matchArray')) {
      const jsonMatch = JSON.parse(localStorage.getItem('matchArray')) as Array<Match>;
      const indexElem = jsonMatch.findIndex(x => x.id === match.id);
      if (indexElem > -1) {
        jsonMatch[indexElem] = match;
        return;
      } else {
        jsonMatch.push(match);
      }
      localStorage.setItem('matchArray', JSON.stringify(jsonMatch));
    }
  }

  // RETRIVE ALL TEAMS
  retriveInfoTeams(): Team[] {
    const teamArray: Team[] = [];
    if (localStorage.getItem('teamArray')) {
      for (const team of JSON.parse(localStorage.getItem('teamArray'))) {
        teamArray.push(Team.fromJson(team));
      }
    }
    return teamArray;
  }

  // RETRIVE ALL MATCHES
  retriveDaysMatches(): Match[] {
    const matchArray: Match[] = [];

    if ( localStorage.getItem('matchArray')) {
      for (const match of JSON.parse(localStorage.getItem('matchArray'))) {
        matchArray.push(Match.fromJson(match));
      }
    }
    return matchArray;

  }
  initializeLocalStorage(keyValue: string, jsonValue: any) {
    localStorage.setItem(keyValue, JSON.stringify(jsonValue));
  }
  matchesNeedUpdate() {
    // TODO VERIFICARE CHE I DATI SALVATI PER I MATCH NEL LOCAL STORAGE NON SONO PIU' VECCHI DI 3 ORE
  }
}
