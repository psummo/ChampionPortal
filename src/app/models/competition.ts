enum CompetitionAttributes {
  id = 'id',
  name = 'name',
  area = 'area'
}

export class Competition {
  id: number;
  name: string;
  area: string;

  static fromJson(competitionJson: any): Competition {
    const competition = new Competition();
    competition.id = competitionJson[' id '];
    competition.name = competitionJson[' name '];
    competition.area = competitionJson[' area '];
    return competition;
  }
}
