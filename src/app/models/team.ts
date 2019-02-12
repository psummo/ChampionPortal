import {Squad} from './squad';
import {Competition} from './competition';

enum TeamAttributes {
  id = 'id',
  activeCompetition = 'activeCompetition',
  name = 'name',
  tla = 'tla',
  crestUrl = 'crestUrl',
  squad = 'squad'
}

export class Team {
  id: number;
  activeCompetition: Competition;
  name: string;
  tla: string;
  crestUrl: string;
  squad: Squad;

  static fromJson(teamJson: any): Team {
    const team = new Team();
    team.id = teamJson[TeamAttributes.id];
    team.activeCompetition = teamJson[teamJson[TeamAttributes.activeCompetition]];
    team.name = teamJson[TeamAttributes.name];
    team.tla = teamJson[TeamAttributes.tla];
    team.crestUrl = teamJson[TeamAttributes.crestUrl];
    team.squad = Squad.fromJson(teamJson[TeamAttributes.squad]);
    return team;
  }
}
