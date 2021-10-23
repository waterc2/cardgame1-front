export class GlobalConstants {
    public static apiURL: string = "http://127.0.0.1/api/";      
    public static imageURL: string = "http://127.0.0.1/storage";
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

export class cardSkill{
    icon: number;
    desc: string;
    energy: number;
    color: string;
    result: Array<number>;
    li:boolean;
    fi:boolean;
    wa:boolean;
    da:boolean;
    ho:boolean;
    na:boolean;
}

export class baseCardMode {
    cardId:number
    abrasion: number;
    cost: number;
    damage: number;
    defense: number;
    defenseColor: string;
    energy: number;
    exhaust: number;
    health: number;
    image: string;
    melee: number;
    meleeColor: string;
    name: string;
    range: number;
    rangeColor: string;
    rarity: number;
    speed: number;
    speedColor: string;
    class: number;
    skills: Array<cardSkill> | undefined;
}
