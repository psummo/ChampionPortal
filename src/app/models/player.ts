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
    player.id = playerJson[' id '];
    player.name = playerJson[' name '];
    player.position = playerJson[' position '];
    player.nationality = playerJson[' nationality '];
    player.shirtNumb = playerJson[' shirtNumb '];
    return player;
  }
}
