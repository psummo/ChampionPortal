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
    squad.id = squadJson[' id '];
    squad.name = squadJson[' name '];
    squad.position = squadJson[' position '];
    squad.nationality = squadJson[' nationality '];
    squad.shirtNumb = squadJson[' shirtNumb '];
    squad.role = squadJson[' role '];
    squad.countryOfBirth = squadJson[' countryOfBirth '];
    return squad;
  }
}
