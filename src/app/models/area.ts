enum AreaAttributes {
  id = 'id',
  name = 'name'
}

export class Area {
  id: number;
  name: string;

  static fromJson(areaJson: any): Area {
    const area = new Area();
    area.id = areaJson[AreaAttributes.id];
    area.name = areaJson[AreaAttributes.name];
    return area;
  }
}


