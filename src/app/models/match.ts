import {Team} from './team';
import {TeamService} from '../services/team.service';

enum MatchAttributes {
  id = 'id',
  fullTime = 'fullTime',
  halfTime = 'halfTime',
  extraTime = 'extraTime',
  penalties = 'penalties',
  referees = 'referees',
  utcDate = 'utcDate',
  matchDay = 'matchday',
  homeTeam = 'homeTeam',
  awayTeam = 'awayTeam',
  name = 'name',
  score = 'score'
}

export class Match {
  id: number;
  fullTime: number[];
  halfTime: number[];
  extraTime: number[];
  penalties: string[];
  referees: string[];
  utcDate: string;
  matchDay: string;
  homeTeam: Team;
  awayTeam: Team;

  static fromJson(matchJson: any): Match {
    const match = new Match();
    match.fullTime = [];
    match.extraTime = [];
    match.halfTime = [];
    match.penalties = [];
    match.referees = [];
    match.id = matchJson[MatchAttributes.id];
    match.halfTime.push(matchJson[MatchAttributes.score][MatchAttributes.halfTime][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.halfTime][MatchAttributes.awayTeam]);
    match.extraTime.push(matchJson[MatchAttributes.score][MatchAttributes.extraTime][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.extraTime][MatchAttributes.awayTeam]);
    match.penalties.push(
      matchJson[MatchAttributes.score][MatchAttributes.penalties][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.penalties][MatchAttributes.awayTeam]);
    for (let i; i < matchJson[MatchAttributes.referees].lenght; i++) {
      match.referees.push(matchJson[MatchAttributes.referees][i][MatchAttributes.name]);
    }
    match.utcDate = matchJson[MatchAttributes.utcDate];
    match.matchDay = matchJson[MatchAttributes.matchDay];
    match.homeTeam = match.retrieveTeam(matchJson[MatchAttributes.homeTeam][MatchAttributes.id]);
    match.awayTeam = match.retrieveTeam(matchJson[MatchAttributes.awayTeam][MatchAttributes.id]);
    // posizione 0 => in casa; posizione 1 =>trasferta
    match.fullTime.push(
      matchJson[MatchAttributes.score][MatchAttributes.fullTime][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.fullTime][MatchAttributes.awayTeam]);
    return match;
  }

  retrieveTeam(id: number): Team {
    for (let team of TeamService.teamCache) {
      if (team.id === id) {
        return team;
      } else {
      }
    }
  }
}
