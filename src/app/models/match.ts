import {Team} from './team';

enum MatchAttributes {
  id = 'id',
  fullTime = 'fullTime',
  halfTime = 'halfTime',
  extraTime = 'extraTime',
  penalties = 'penalties',
  referees = 'referees',
  utcDate = 'utcDate',
  matchDay = 'matchDay',
  homeTeam = 'homeTeam',
  awayTeam = 'awayTeam',
  name = 'name'
}

export class Match {
  id: number;
  fullTime: number[];
  halfTime: number[];
  extraTime: number[];
  penalties: string;
  referees: string[];
  utcDate: string;
  matchDay: string;
  homeTeam: Team;
  awayTeam: Team;

  static fromJson(matchJson: any): Match {
    const match = new Match();
    console.log(matchJson);
    match.id = matchJson[MatchAttributes.id];
    match.fullTime = matchJson[MatchAttributes.fullTime];
    match.halfTime = matchJson[MatchAttributes.halfTime];
    match.extraTime = matchJson[MatchAttributes.extraTime];
    match.penalties = matchJson[MatchAttributes.penalties];
    for (let i = 0; i < matchJson[MatchAttributes.referees].lenght; i++) {
      match.referees.push(matchJson[MatchAttributes.referees][i][MatchAttributes.name]);
    }
    match.utcDate = matchJson[MatchAttributes.utcDate];
    match.matchDay = matchJson[MatchAttributes.matchDay];
    match.homeTeam = Team.fromJson(matchJson[MatchAttributes.homeTeam]);
    match.awayTeam = Team.fromJson(matchJson[MatchAttributes.awayTeam]);
    return match;
  }
}
