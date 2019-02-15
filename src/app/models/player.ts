enum SquadAttributes {
  dateOfBirth = 'dateOfBirth',
  id = 'id',
  name = 'name',
  position = 'position',
  nationality = 'nationality',
  shirtNumber = 'shirtNumber',
  role = 'role',
  countryOfBirth = 'countryOfBirth'
}

export class Player {
  id: number;
  name: string;
  position: string;
  nationality: string;
  shirtNumb: number;
  role: string;
  countryOfBirth: string;
  dateOfBirth: string;

  static fromJson(squadJson: any): Player {
    const squad = new Player();
    squad.id = squadJson[SquadAttributes.id];
    squad.name = squadJson[SquadAttributes.name];
    squad.position = squadJson[SquadAttributes.position];
    squad.nationality = squadJson[SquadAttributes.nationality];
    squad.shirtNumb = squadJson[SquadAttributes.shirtNumber];
    squad.role = squadJson[SquadAttributes.role];
    squad.countryOfBirth = squadJson[SquadAttributes.countryOfBirth];
    squad.dateOfBirth = squadJson[SquadAttributes.dateOfBirth];
    return squad;
  }
}
