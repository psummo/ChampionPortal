enum ScoreAttributes {
  wins = 'wins',
  draws = 'draws',
  losses = 'losses'
}

export class ScoreTeam {
  wins: number;
  drwas: number;
  losses: number;

  static  fromJson(scoreJson: any): ScoreTeam {
    const scrTeam = new ScoreTeam();
    scrTeam.drwas = scoreJson[ScoreAttributes.draws];
    scrTeam.losses = scoreJson[ScoreAttributes.losses];
    scrTeam.wins = scoreJson[ScoreAttributes.wins];
    return scrTeam;
  }
}
