import {Area} from './area';

enum CompetitionAttributes {
  id = 'id',
  name = 'name',
  area = 'area'
}

export class Competition {
  id: number;
  name: string;
  area: Area;

  static fromJson(competitionJson: any): Competition {
    const competition = new Competition();
    competition.id = competitionJson[CompetitionAttributes.id];
    competition.name = competitionJson[CompetitionAttributes.name];
    competition.area = Area.fromJson(competitionJson[CompetitionAttributes.area]);
    return competition;
  }
}
