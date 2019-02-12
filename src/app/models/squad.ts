enum SquadAttributes {
  id = 'id',
  name = 'name',
  position = 'position',
  nationality = 'nationality',
  shirtNumb = 'shirtNumb',
  role = 'role',
  countryOfBirth = 'countryOfBirth'
}

export class Squad {
  id: number;
  name: string;
  position: string;
  nationality: string;
  shirtNumb: number;
  role: string;
  countryOfBirth: string;

  static fromJson(squadJson: any): Squad {
    const squad = new Squad();
    squad.id = squadJson[SquadAttributes.id];
    squad.name = squadJson[SquadAttributes.name];
    squad.position = squadJson[SquadAttributes.position];
    squad.nationality = squadJson[SquadAttributes.nationality];
    squad.shirtNumb = squadJson[SquadAttributes.shirtNumb];
    squad.role = squadJson[SquadAttributes.role];
    squad.countryOfBirth = squadJson[SquadAttributes.countryOfBirth];
    return squad;
  }
}
