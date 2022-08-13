import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { baseCardMode, GlobalConstants } from 'src/app/share/models';
import * as PIXI from 'pixi.js'

@Component({
  selector: 'app-cardDisplay',
  templateUrl: './cardDisplay.component.html',
  styleUrls: ['./cardDisplay.component.scss'],
})
export class CardDisplayComponent implements OnInit {
  @Input() card: baseCardMode;
  @Input() cardSize: number;

  id: string;
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

  constructor(private elRef: ElementRef) { }



  ngOnInit() {
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

    const app = new PIXI.Application({ width: 100, height:100,backgroundColor: 0xffffff,  resolution: window.devicePixelRatio || 1 });

    this.elRef.nativeElement.firstChild.appendChild(app.view);


    const cardContainer = new PIXI.Container();


    const frame = PIXI.Sprite.from(this.frameImage[this.card.rarity]);
    frame.position.set(10,10);
    frame.scale.set(0.25);

    const card = PIXI.Sprite.from(this.card.image);
    card.position.set(20,30);
    card.scale.set(0.25);
    cardContainer.addChild(card);
    cardContainer.addChild(frame);
    // cardContainer.scale.set(0.5);
    app.stage.addChild(cardContainer);
    
  }
}
