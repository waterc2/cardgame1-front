import { Component, Input, OnInit } from '@angular/core';
import { baseCardMode, GlobalConstants } from 'src/app/share/models';
import {
  faDotCircle,
  faGem,
  faAtom,
  faBolt,
  faStarOfDavid,
  faHourglass,
  faHourglassEnd,
  faPooStorm,
  faSkullCrossbones,
  faSun,
  faHeartBroken,
  faCrosshairs,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cardDisplay',
  templateUrl: './cardDisplay.component.html',
  styleUrls: ['./cardDisplay.component.scss'],
})
export class CardDisplayComponent implements OnInit {
  @Input() card: baseCardMode;
  @Input() cardSize: number;
  faDotCircle = faDotCircle;
  faGem = faGem;
  faAtom = faAtom;
  faBolt = faBolt;
  faStarOfDavid = faStarOfDavid;
  faHourglass = faHourglass;
  faHourglassEnd = faHourglassEnd;
  faPooStorm = faPooStorm;
  faSkullCrossbones = faSkullCrossbones;
  faSun = faSun;
  faHeartBroken = faHeartBroken;
  faCrosshairs = faCrosshairs;

  specialHeight: number;
  bigCard: number = 1;
  frameImage: string[];
  titleColor: string;
  className: string;
  skillsArray: Array<any>;
  defenseColor: string;
  attackColor: string;
  speedColor: string;
  spiritColor: string;
  iconAttack: string = GlobalConstants.imageURL + '/icons/melee.svg';
  iconSpeed: string = GlobalConstants.imageURL + '/icons/speed.svg';
  iconMagic: string = GlobalConstants.imageURL + '/icons/magic.svg';
  iconDefense: string = GlobalConstants.imageURL + '/icons/defense.svg';
  iconHealth: string = GlobalConstants.imageURL + '/icons/health.svg';
  iconSpirit: string = GlobalConstants.imageURL + '/icons/spirit.svg';

  constructor() {}

  ngOnInit() {
    if (this.cardSize === 50) {
      this.bigCard = 0;
    } else {
      this.specialHeight = 400;
    }
    this.frameImage = [
      GlobalConstants.imageURL + '/assets/frame1_0.png',
      GlobalConstants.imageURL + '/assets/frame1_1.png',
      GlobalConstants.imageURL + '/assets/frame1_2.png',
      GlobalConstants.imageURL + '/assets/frame1_3.png',
      GlobalConstants.imageURL + '/assets/frame1_4.png',
      GlobalConstants.imageURL + '/assets/frame1_5.png',
    ];
    if (this.card.rarity < 2) {
      this.titleColor = 'black';
    } else {
      this.titleColor = 'blanchedalmond';
    }
    this.className = 'gameBase.cardClassName_' + this.card.class;
    this.defenseColor = 'valueFont' + this.card.defenseColor;
    this.attackColor = 'valueFont' + this.card.attackColor;
    this.speedColor = 'valueFont' + this.card.speedColor;
    this.spiritColor = 'valueFont' + this.card.spiritColor;
  }

  getIcon(index: number) {
    switch (index) {
      case 11:
        return this.faBolt;
      case 12:
      case 14:
      case 15:
        return this.faPooStorm;
      case 21:
      case 22:
      case 23:
        return this.faSun;
      case 31:
        return this.faStarOfDavid;
      case 32:
        return this.faHeartBroken;
      case 33:
        return this.faSkullCrossbones;
      case 41:
        return this.faHourglass;
      case 42:
        return this.faAtom;
        case 43:
      return this.faHourglassEnd;
        case 100:
      return this.faCrosshairs;
    }
    return this.faDotCircle;
  }
}
