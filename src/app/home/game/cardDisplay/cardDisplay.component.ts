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
    //Start PIXI JS code
    let renderer = new PIXI.Application({ 
      width: this.cardSize * 4, height: this.cardSize * 4, backgroundColor: 0xffffff,
      autoDensity:true,
      resolution:window.devicePixelRatio,
      backgroundAlpha:0,
    });
    const cardContainer = new PIXI.Container();
    
    let nameColor = "black";
    if(this.card.rarity>1){
      nameColor = "white";
    }

    const frameImage = PIXI.Sprite.from(this.frameImage[this.card.rarity]);
    frameImage.position.set(100, 100);
    frameImage.anchor.set(0.5);
    frameImage.scale.set(0.5);

    const cardImage = PIXI.Sprite.from(this.card.image);
    cardImage.position.set(100, 100+7);
    cardImage.scale.set(0.48);
    cardImage.anchor.set(0.5);
    cardContainer.addChild(cardImage);
    cardContainer.addChild(frameImage);

    var cardName = new PIXI.Text(this.card.name,//+"["+this.translateService.instant(this.className)+"]",
      {
        fontFamily: "Hiragino Sans GB",
        fontSize: 10,
        fontWeight: '500',
        fill: nameColor,
        align: 'center'
      });
    cardName.anchor.set(0.5, 0.5);
    cardName.position.set(100, 35);
    cardContainer.addChild(cardName);

    if (this.card.abrasion !== 0) {
      var abrasion = new PIXI.Graphics();
      abrasion.beginFill(0x37a7ed);
      abrasion.drawRoundedRect(
        146,
        17,
        28,
        16,
        20
      );
      abrasion.endFill();
      var abrasionNumber = new PIXI.Text(this.card.abrasion,//+"["+this.translateService.instant(this.className)+"]",
        {
          fontFamily: "tahoma,sans-serif",
          fontSize: 11,
          //fontWeight: '600',
          fill: "white",
          align: 'center'
        });
      abrasionNumber.anchor.set(0.5, 0.5);
      abrasionNumber.position.set(160, 25);
      cardContainer.addChild(abrasion);
      cardContainer.addChild(abrasionNumber);
    }

    //Health
    var health = new PIXI.Graphics();
    health.beginFill(0xed5537);
    health.drawRoundedRect(
      22,
      171,
      35,
      18,
      30
    );
    health.endFill();
    var healthNumber = new PIXI.Text(this.card.health,
      {
        fontFamily: "tahoma,sans-serif",
        fontSize: 12,
        //fontWeight: '600',
        fill: "white",
        align: 'center'
      });
    healthNumber.anchor.set(0.5, 0.5);
    healthNumber.position.set(40, 180);
    cardContainer.addChild(health);
    cardContainer.addChild(healthNumber);

    //Attack
    var attack = new PIXI.Graphics();
    attack.beginFill(0xfc0303);
    attack.drawRoundedRect(
      26,
      70,
      25,
      14,
      10
    );
    attack.endFill();
    var attackNumber = new PIXI.Text(this.card.attack,
      {
        fontFamily: "tahoma,sans-serif",
        fontSize: 10,
        //fontWeight: '600',
        fill: "white",
        align: 'center'
      });
    attackNumber.anchor.set(0.5, 0.5);
    attackNumber.position.set(38.5, 76.5);
    cardContainer.addChild(attack);
    cardContainer.addChild(attackNumber);

    //Defense
    var defense = new PIXI.Graphics();
    defense.beginFill(0xd1a221);
    defense.drawRoundedRect(
      26,
      95,
      25,
      14,
      10
    );
    defense.endFill();
    var defenseNumber = new PIXI.Text(this.card.defense,
      {
        fontFamily: "tahoma,sans-serif",
        fontSize: 10,
        //fontWeight: '600',
        fill: "white",
        align: 'center'
      });
    defenseNumber.anchor.set(0.5, 0.5);
    defenseNumber.position.set(38.5, 101.5);
    cardContainer.addChild(defense);
    cardContainer.addChild(defenseNumber);

    //Speed
    var speed = new PIXI.Graphics();
    speed.beginFill(0x47d121);
    speed.drawRoundedRect(
      26,
      120,
      25,
      14,
      10
    );
    speed.endFill();
    var speedNumber = new PIXI.Text(this.card.speed,
      {
        fontFamily: "tahoma,sans-serif",
        fontSize: 10,
        //fontWeight: '600',
        fill: "white",
        align: 'center'
      });
    speedNumber.anchor.set(0.5, 0.5);
    speedNumber.position.set(38.5, 126.5);
    cardContainer.addChild(speed);
    cardContainer.addChild(speedNumber);

    //Spirit
    if (this.card.spirit) {
      var spirit = new PIXI.Graphics();
      spirit.beginFill(0xb220d6);
      spirit.drawRoundedRect(
        26,
        145,
        25,
        14,
        10
      );
      spirit.endFill();
      var spiritNumber = new PIXI.Text(this.card.spirit,
        {
          fontFamily: "tahoma,sans-serif",
          fontSize: 10,
          //fontWeight: '600',
          fill: "white",
          align: 'center'
        });
      spiritNumber.anchor.set(0.5, 0.5);
      spiritNumber.position.set(38.5, 151.5);
      cardContainer.addChild(spirit);
      cardContainer.addChild(spiritNumber);
    }
    //Set card container scale
    cardContainer.scale.set(this.cardSize / 50);

    //Define Ticker
    // const ticker = new PIXI.Ticker();
    // ticker.add(animate);
    // ticker.start();

    //function animate(){
      //renderer.render(cardContainer);
    //}
    const image = renderer.renderer.plugins.extract.canvas(cardContainer);
    renderer.destroy(true);
    var sourceContext = image.getContext('2d');
    var extractCanvas = document.createElement('canvas');
    var extractContext = extractCanvas.getContext('2d');
    var imageData = sourceContext.getImageData(0, 0, this.cardSize*4, this.cardSize*4);

    extractCanvas.width = this.cardSize*4;
    extractCanvas.height = this.cardSize*4;
    extractContext.putImageData(imageData, 0, 0);
    this.elRef.nativeElement.firstChild.appendChild(extractCanvas);
  }

}
