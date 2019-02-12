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
  activeCompetition: string;
  name: string;
  tla: string;
  crestUrl: string;
  squad: string;

  static fromJson(teamJson: any): Team {
    const team = new Team();
    team.id = teamJson[' id '];
    team.activeCompetition = teamJson[' activeCompetition '];
    team.name = teamJson[' name '];
    team.tla = teamJson[' tla '];
    team.crestUrl = teamJson[' crestUrl '];
    team.squad = teamJson[' squad '];
    return team;
  }
}
