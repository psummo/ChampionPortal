enum MatchAttributes {
  fullTime = 'fullTime',
  halfTime = 'halfTime',
  extraTime = 'extraTime',
  penalties = 'penalties',
  referees = 'referees',
  utcDate = 'utcDate',
  matchDay = 'matchDay',
  homeTeam = 'homeTeam',
  awayTeam = 'awayteam'
}

export class Match {
  fullTime: string;
  halfTime: string;
  extraTime: string;
  penalties: string;
  referees: string;
  utcDate: string;
  matchDay: string;
  homeTeam: string;
  awayTeam: string;

  static fromJson(matchJson: any): Match {
    const match = new Match();
    match.fullTime = matchJson[' fullTime '];
    match.halfTime = matchJson[' halfTime '];
    match.extraTime = matchJson[' extraTime '];
    match.penalties = matchJson[' penalties '];
    match.referees = matchJson[' referees '];
    match.utcDate = matchJson[' utcDate '];
    match.matchDay = matchJson[' matchDay '];
    match.homeTeam = matchJson[' homeTeam '];
    match.awayTeam = matchJson[' awayTeam '];
    return match;
  }
}
