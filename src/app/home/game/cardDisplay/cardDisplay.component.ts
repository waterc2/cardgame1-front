import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { baseCardMode, GlobalConstants } from 'src/app/share/models';
import * as PIXI from 'pixi.js'
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private elRef: ElementRef,
    private translateService: TranslateService) { }



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

    const app = new PIXI.Application({ width: this.cardSize * 2, height: this.cardSize * 2, backgroundColor: 0xffffff, resolution: window.devicePixelRatio || 1 });

    this.elRef.nativeElement.firstChild.appendChild(app.view);


    const cardContainer = new PIXI.Container();
    let nameColor = "black";
    if(this.card.rarity>1){
      nameColor = "white";
    }

    const frame = PIXI.Sprite.from(this.frameImage[this.card.rarity]);
    frame.position.set(15, 5);
    frame.scale.set(0.25);

    const card = PIXI.Sprite.from(this.card.image);
    card.position.set(24, 23);
    card.scale.set(0.25);
    cardContainer.addChild(card);
    cardContainer.addChild(frame);

    var cardName = new PIXI.Text(this.card.name,//+"["+this.translateService.instant(this.className)+"]",
      {
        fontFamily: 'Helvetica',
        fontSize: 6,
        fontWeight: '500',
        fill: nameColor,
        align: 'center'
      });
    cardName.anchor.set(0.5, 0.5);
    cardName.position.set(52, 20);
    cardContainer.addChild(cardName);

    if (this.card.abrasion !== 0) {
      var abrasion = new PIXI.Graphics();
      abrasion.beginFill(0x37a7ed);
      abrasion.drawRoundedRect(
        75,
        10,
        12,
        8,
        20
      );
      abrasion.endFill();
      var abrasionNumber = new PIXI.Text(this.card.abrasion,//+"["+this.translateService.instant(this.className)+"]",
        {
          fontFamily: 'Helvetica',
          fontSize: 5,
          //fontWeight: '600',
          fill: "black",
          align: 'center'
        });
      abrasionNumber.anchor.set(0.5, 0.5);
      abrasionNumber.position.set(81, 14);
      cardContainer.addChild(abrasion);
      cardContainer.addChild(abrasionNumber);
    }

    //Health
    var health = new PIXI.Graphics();
    health.beginFill(0xed5537);
    health.drawRoundedRect(
      16,
      86,
      16,
      10,
      30
    );
    health.endFill();
    var healthNumber = new PIXI.Text(this.card.health,
      {
        fontFamily: 'Helvetica',
        fontSize: 6,
        //fontWeight: '600',
        fill: "black",
        align: 'center'
      });
    healthNumber.anchor.set(0.5, 0.5);
    healthNumber.position.set(24, 91);
    cardContainer.addChild(health);
    cardContainer.addChild(healthNumber);

    //Attack
    var attack = new PIXI.Graphics();
    attack.beginFill(0xfc0303);
    attack.drawRoundedRect(
      18,
      40,
      12,
      8,
      20
    );
    attack.endFill();
    var attackNumber = new PIXI.Text(this.card.attack,
      {
        fontFamily: 'Helvetica',
        fontSize: 6,
        //fontWeight: '600',
        fill: "black",
        align: 'center'
      });
    attackNumber.anchor.set(0.5, 0.5);
    attackNumber.position.set(24, 44);
    cardContainer.addChild(attack);
    cardContainer.addChild(attackNumber);

    //Defense
    var defense = new PIXI.Graphics();
    defense.beginFill(0xd1a221);
    defense.drawRoundedRect(
      18,
      52,
      12,
      8,
      20
    );
    defense.endFill();
    var defenseNumber = new PIXI.Text(this.card.defense,
      {
        fontFamily: 'Helvetica',
        fontSize: 6,
        //fontWeight: '600',
        fill: "black",
        align: 'center'
      });
    defenseNumber.anchor.set(0.5, 0.5);
    defenseNumber.position.set(24, 56);
    cardContainer.addChild(defense);
    cardContainer.addChild(defenseNumber);

    //Speed
    var speed = new PIXI.Graphics();
    speed.beginFill(0x47d121);
    speed.drawRoundedRect(
      18,
      64,
      12,
      8,
      20
    );
    speed.endFill();
    var speedNumber = new PIXI.Text(this.card.speed,
      {
        fontFamily: 'Helvetica',
        fontSize: 6,
        //fontWeight: '600',
        fill: "black",
        align: 'center'
      });
    speedNumber.anchor.set(0.5, 0.5);
    speedNumber.position.set(24, 68);
    cardContainer.addChild(speed);
    cardContainer.addChild(speedNumber);

    //Spirit
    if (this.card.spirit) {
      var spirit = new PIXI.Graphics();
      spirit.beginFill(0xb220d6);
      spirit.drawRoundedRect(
        18,
        76,
        12,
        8,
        20
      );
      spirit.endFill();
      var spiritNumber = new PIXI.Text(this.card.spirit,
        {
          fontFamily: 'Helvetica',
          fontSize: 6,
          //fontWeight: '600',
          fill: "black",
          align: 'center'
        });
      spiritNumber.anchor.set(0.5, 0.5);
      spiritNumber.position.set(24, 80);
      cardContainer.addChild(spirit);
      cardContainer.addChild(spiritNumber);
    }


    cardContainer.scale.set(this.cardSize / 50);
    app.stage.addChild(cardContainer);

    //app.stop();
  }
}
