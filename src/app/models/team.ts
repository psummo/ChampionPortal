import {Player} from './player';
import {Competition} from './competition';

enum TeamAttributes {
  venue = 'venue',
  founded = 'founded',
  website = 'website',
  id = 'id',
  activeCompetition = 'activeCompetition',
  name = 'name',
  tla = 'tla',
  crestUrl = 'crestUrl',
  squad = 'squad'
}

export class Team {
  id: number;
  activeCompetition: Competition[] = [];
  name: string;
  tla: string;
  crestUrl: string;
  website: string;
  founded: number;
  venue: string;
  squad: Player[] = [];

  static fromJson(teamJson: any): Team {
    const team = new Team();
    try {
    team.id = teamJson[TeamAttributes.id];
    team.name = teamJson[TeamAttributes.name];
    team.tla = teamJson[TeamAttributes.tla];
    team.website = teamJson[TeamAttributes.website];
    team.founded = teamJson[TeamAttributes.founded];
    team.venue = teamJson[TeamAttributes.venue];
    team.crestUrl = teamJson[TeamAttributes.crestUrl];
  } catch (e) {
      console.log();
    }
    return team;
  }

  static addSquad(infoTeamJson: any): Player[] {
    const players: Player[] = [];
    for (const player of infoTeamJson) {
      players.push(Player.fromJson(player));
    }
    return players;
  }
  static addCompetitions(infoTeamJson: any): Competition[] {
    const competitions: Competition[] = [];
    for (const competition of infoTeamJson) {
      competitions.push(Competition.fromJson(competition));
    }
    return competitions;
  }
}
