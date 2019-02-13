import {Team} from './team';

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
    console.log(matchJson);
    match.id = matchJson[MatchAttributes.id];
    match.halfTime.push(matchJson[MatchAttributes.score][MatchAttributes.halfTime][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.halfTime][MatchAttributes.awayTeam]);
    match.extraTime.push(matchJson[MatchAttributes.score][MatchAttributes.extraTime][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.extraTime][MatchAttributes.awayTeam]);
    match.penalties.push(
      matchJson[MatchAttributes.score][MatchAttributes.penalties][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.penalties][MatchAttributes.awayTeam]);
    for(let i = 0; i < matchJson[MatchAttributes.referees].length; i++) {
      match.referees.push(matchJson[MatchAttributes.referees][i][MatchAttributes.name]);
    }
    match.utcDate = matchJson[MatchAttributes.utcDate];
    match.matchDay = matchJson[MatchAttributes.matchDay];
    match.homeTeam = Team.fromJson(matchJson[MatchAttributes.homeTeam]);
    match.awayTeam = Team.fromJson(matchJson[MatchAttributes.awayTeam]);
    // posizione 0 => in casa; posizione 1 =>trasferta
    match.fullTime.push(
      matchJson[MatchAttributes.score][MatchAttributes.fullTime][MatchAttributes.homeTeam],
      matchJson[MatchAttributes.score][MatchAttributes.fullTime][MatchAttributes.awayTeam]);
    return match;
  }
}
