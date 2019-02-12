enum PlayerAttributes {
  id = 'id',
  name = 'name',
  position = 'position',
  nationality = 'nationality',
  shirtNumb = 'shirtNumb'
}

export class Player {
  id: number;
  name: string;
  position: string;
  nationality: string;
  shirtNumb: number;

  static fromJson(playerJson: any): Player {
    const player = new Player();
    player.id = playerJson[PlayerAttributes.id];
    player.name = playerJson[PlayerAttributes.name];
    player.position = playerJson[PlayerAttributes.position];
    player.nationality = playerJson[PlayerAttributes.nationality];
    player.shirtNumb = playerJson[PlayerAttributes.shirtNumb];
    return player;
  }
}
