export class GlobalConstants {
  public static apiURL: string = 'http://127.0.0.1/api/';
  public static imageURL: string = 'http://127.0.0.1/storage';
}

export class basePackageMode {
  id: number;
  name: string;
  level: number;
  image: string;
  rare: number;
  value: number;
  class: string;
}

export class cardSkill {
  icon: number;
  desc: string;
  energy: number;
  color: string;
  result: Array<number>;
  li: boolean;
  fi: boolean;
  wa: boolean;
  da: boolean;
  ho: boolean;
  na: boolean;
}

export class baseCardMode {
  cardId: number;
  cost: number;  
  abrasion: number;  
  health: number;
  attack: number;
  attackColor: string;
  speed: number;
  speedColor: string;
  defense: number;
  defenseColor: string;
  spirit: number;
  spiritColor: string;
  energy: number;
  image: string;
  name: string;
  rarity: number;
  class: number;
  skills: Array<cardSkill> | undefined;
}

export class gameStage {
  d_id: number;
  map_id: number;
  s_d_data: string;
  s_data: string;
  f_id: number;
  s_map_data: string;
  s_status: number;
  s_type: number;
}

export class baseMap {
  map_data: any[];
  map_image: string;
  map_name: string;
  map_style: string;
}

export class fightMode {
  boardCards:Array<any>;
  boardStatus:Array<any>;
  enemyStatus:fightStatusMode;
  myHandCards:Array<baseCardMode>;
  myStatus:fightStatusMode;
  stageData:fightStageMode;
}

export class fightStatusMode{
  currentEnergy: number;
  currentHP: number;
  fullHP: number;
  cardLeft:number;
}

export class fightStageMode{
  currentStage:number;
}
