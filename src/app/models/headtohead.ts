import {ScoreTeam} from './scoreTeam';

enum head2headAttributes {
  numberOfMatches = 'numberOfMatches',
  totalGoals = 'totalGoals',
  homeTeam = 'homeTeam',
  awayTeam = 'awayTeam'
}

export class Headtohead {
  numberOfMatches: number;
  totalGoals: number;
  homeTeam: ScoreTeam;
  awayTeam: ScoreTeam;
  static fromJson(hthJson: any) {
    const hth = new Headtohead();
    hth.homeTeam = ScoreTeam.fromJson(hthJson[head2headAttributes.homeTeam]);
    hth.awayTeam = ScoreTeam.fromJson(hthJson[head2headAttributes.awayTeam]);
    hth.numberOfMatches = hthJson[head2headAttributes.numberOfMatches];
    hth.totalGoals = hthJson[head2headAttributes.totalGoals];
    return hth;
  }
}
