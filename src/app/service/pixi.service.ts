import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js'
import { baseCardMode, GlobalConstants } from 'src/app/share/models';

@Injectable({
    providedIn: 'root'
  })

export class pixiService {
  drawCard(card: baseCardMode,baseCardWidth:number = 200){
      const cardFrameImage = [
          GlobalConstants.imageURL + '/assets/frame1_0.png',
          GlobalConstants.imageURL + '/assets/frame1_1.png',
          GlobalConstants.imageURL + '/assets/frame1_2.png',
          GlobalConstants.imageURL + '/assets/frame1_3.png',
          GlobalConstants.imageURL + '/assets/frame1_4.png',
          GlobalConstants.imageURL + '/assets/frame1_5.png',
        ];
        let titleColor;
        if (card.rarity < 2) {
          titleColor = 'black';
        } else {
          titleColor = 'blanchedalmond';
        }
        let className = 'gameBase.cardClassName_' + card.class;
        let defenseColor = 'valueFont' + card.defenseColor;
        let attackColor = 'valueFont' + card.attackColor;
        let speedColor = 'valueFont' + card.speedColor;
        let spiritColor = 'valueFont' + card.spiritColor;
        //Start PIXI JS code
        const cardContainer = new PIXI.Container();
        let nameColor = "black";
        if(card.rarity>1){
          nameColor = "white";
        }
        let frameImage = PIXI.Sprite.from(cardFrameImage[card.rarity]);
        frameImage.position.set(100, 100);
        frameImage.anchor.set(0.5);
        frameImage.scale.set(0.5);
    
        const cardImage = PIXI.Sprite.from(card.image);
        cardImage.position.set(100, 100+7);
        cardImage.scale.set(0.48);
        cardImage.anchor.set(0.5);
        cardContainer.addChild(cardImage);
        cardContainer.addChild(frameImage);
    
        var cardName = new PIXI.Text(card.name,//+"["+this.translateService.instant(this.className)+"]",
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
    
        if (card.abrasion !== 0) {
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
          var abrasionNumber = new PIXI.Text(card.abrasion,//+"["+this.translateService.instant(this.className)+"]",
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
        var healthNumber = new PIXI.Text(card.health,
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
        var attackNumber = new PIXI.Text(card.attack,
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
        var defenseNumber = new PIXI.Text(card.defense,
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
        var speedNumber = new PIXI.Text(card.speed,
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
        if (card.spirit) {
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
          var spiritNumber = new PIXI.Text(card.spirit,
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
        cardContainer.scale.set(baseCardWidth/200);

        //Set interaction
        cardContainer.interactive = true;
        cardContainer.buttonMode = true;

        return cardContainer;
  }
  
  drawCardLarge(card: baseCardMode,baseCardWidth:number = 200,pixi:PIXI.Application){
    const cardFrameImage = [
        GlobalConstants.imageURL + '/assets/frame1_0.png',
        GlobalConstants.imageURL + '/assets/frame1_1.png',
        GlobalConstants.imageURL + '/assets/frame1_2.png',
        GlobalConstants.imageURL + '/assets/frame1_3.png',
        GlobalConstants.imageURL + '/assets/frame1_4.png',
        GlobalConstants.imageURL + '/assets/frame1_5.png',
      ];
      let titleColor;
      if (card.rarity < 2) {
        titleColor = 'black';
      } else {
        titleColor = 'blanchedalmond';
      }
      let className = 'gameBase.cardClassName_' + card.class;
      let defenseColor = 'valueFont' + card.defenseColor;
      let attackColor = 'valueFont' + card.attackColor;
      let speedColor = 'valueFont' + card.speedColor;
      let spiritColor = 'valueFont' + card.spiritColor;
      //Start PIXI JS code
      const cardContainer = new PIXI.Container();
      //Background
      //console.log(pixi.width);
      


      let nameColor = "black";
      if(card.rarity>1){
        nameColor = "white";
      }

      let frameImage = PIXI.Sprite.from(cardFrameImage[card.rarity]);
      frameImage.position.set(100, 100);
      frameImage.anchor.set(0.5);
      frameImage.scale.set(0.5);
  
      const cardImage = PIXI.Sprite.from(card.image);
      cardImage.position.set(100, 100+7);
      cardImage.scale.set(0.48);
      cardImage.anchor.set(0.5);
      cardContainer.addChild(cardImage);
      cardContainer.addChild(frameImage);
  
      var cardName = new PIXI.Text(card.name,//+"["+this.translateService.instant(this.className)+"]",
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
  
      if (card.abrasion !== 0) {
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
        var abrasionNumber = new PIXI.Text(card.abrasion,//+"["+this.translateService.instant(this.className)+"]",
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
      var healthNumber = new PIXI.Text(card.health,
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
      var attackNumber = new PIXI.Text(card.attack,
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
      var defenseNumber = new PIXI.Text(card.defense,
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
      var speedNumber = new PIXI.Text(card.speed,
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
      if (card.spirit) {
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
        var spiritNumber = new PIXI.Text(card.spirit,
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
      //cardContainer.scale.set(baseCardWidth/200);

      //Set interaction
      cardContainer.interactive = true;
      cardContainer.buttonMode = true;

      return cardContainer;
}
}
