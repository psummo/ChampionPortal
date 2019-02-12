import {Player} from './player';
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
  squad: Player[] = [];

  static fromJson(teamJson: any): Team {
    const team = new Team();
    console.log("TEAM");
    team.id = teamJson[TeamAttributes.id];
    team.name = teamJson[TeamAttributes.name];
    try {
    team.activeCompetition = teamJson[teamJson[TeamAttributes.activeCompetition]];
    team.tla = teamJson[TeamAttributes.tla];
    team.crestUrl = teamJson[TeamAttributes.crestUrl];
    for (let i = 0; i < teamJson[TeamAttributes.squad].lenght; i++) {
      team.squad.push(Player.fromJson(teamJson[TeamAttributes.squad][i]));
    }
  } catch (e) {}
    return team;
  }
}
