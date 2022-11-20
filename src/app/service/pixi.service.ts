import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js'
import { baseCardMode, GlobalConstants } from 'src/app/share/models';
import { publicFunctionService } from 'src/app/service/publicFunction.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
   providedIn: 'root'
})

export class pixiService {

   constructor(
      private translateService: TranslateService,
      private publicFunctionService: publicFunctionService,
   ) { }

   drawCard(card: baseCardMode, baseCardWidth: number = 200) {
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
      //Start PIXI JS code
      const cardContainer = new PIXI.Container();
      let nameColor = "black";
      if (card.rarity > 1) {
         nameColor = "white";
      }
      let frameImage = PIXI.Sprite.from(cardFrameImage[card.rarity]);
      frameImage.position.set(100 - 10, 100);
      frameImage.anchor.set(0.5);
      frameImage.scale.set(0.5);

      const cardImage = PIXI.Sprite.from(card.image);
      cardImage.position.set(100 - 10, 100 + 7);
      cardImage.scale.set(0.48);
      cardImage.anchor.set(0.5);
      cardContainer.addChild(cardImage);
      cardContainer.addChild(frameImage);

      const cardName = new PIXI.Text(card.name,//+"["+this.translateService.instant(this.className)+"]",
         {
            fontFamily: "Hiragino Sans GB",
            fontSize: 10,
            fontWeight: '500',
            fill: nameColor,
            align: 'center'
         });
      cardName.anchor.set(0.5, 0.5);
      cardName.position.set(100 - 10, 35);
      cardContainer.addChild(cardName);

      if (card.abrasion !== 0) {
         const abrasion = new PIXI.Graphics();
         abrasion.beginFill(0x37a7ed);
         abrasion.drawRoundedRect(
            146 - 10,
            17,
            28,
            16,
            20
         );
         abrasion.endFill();
         const abrasionNumber = new PIXI.Text(card.abrasion,//+"["+this.translateService.instant(this.className)+"]",
            {
               fontFamily: "tahoma,sans-serif",
               fontSize: 11,
               //fontWeight: '600',
               fill: "white",
               align: 'center'
            });
         abrasionNumber.anchor.set(0.5, 0.5);
         abrasionNumber.position.set(160 - 10, 25);
         cardContainer.addChild(abrasion);
         cardContainer.addChild(abrasionNumber);
      }

      //Health
      const health = new PIXI.Graphics();
      health.beginFill(0xed5537);
      health.drawRoundedRect(
         22 - 10,
         171,
         35,
         18,
         30
      );
      health.endFill();
      const healthNumber = new PIXI.Text(card.health,
         {
            fontFamily: "tahoma,sans-serif",
            fontSize: 12,
            //fontWeight: '600',
            fill: "white",
            align: 'center'
         });
      healthNumber.anchor.set(0.5, 0.5);
      healthNumber.position.set(40 - 10, 180);
      cardContainer.addChild(health);
      cardContainer.addChild(healthNumber);

      //Attack
      const attack = new PIXI.Graphics();
      attack.beginFill(0xfc0303);
      attack.drawRoundedRect(
         26 - 10,
         70,
         25,
         14,
         10
      );
      attack.endFill();
      const attackNumber = new PIXI.Text(card.attack,
         {
            fontFamily: "tahoma,sans-serif",
            fontSize: 10,
            //fontWeight: '600',
            fill: "white",
            align: 'center'
         });
      attackNumber.anchor.set(0.5, 0.5);
      attackNumber.position.set(38.5 - 10, 76.5);
      cardContainer.addChild(attack);
      cardContainer.addChild(attackNumber);

      //Defense
      const defense = new PIXI.Graphics();
      defense.beginFill(0xd1a221);
      defense.drawRoundedRect(
         26 - 10,
         95,
         25,
         14,
         10
      );
      defense.endFill();
      const defenseNumber = new PIXI.Text(card.defense,
         {
            fontFamily: "tahoma,sans-serif",
            fontSize: 10,
            //fontWeight: '600',
            fill: "white",
            align: 'center'
         });
      defenseNumber.anchor.set(0.5, 0.5);
      defenseNumber.position.set(38.5 - 10, 101.5);
      cardContainer.addChild(defense);
      cardContainer.addChild(defenseNumber);

      //Speed
      const speed = new PIXI.Graphics();
      speed.beginFill(0x47d121);
      speed.drawRoundedRect(
         26 - 10,
         120,
         25,
         14,
         10
      );
      speed.endFill();
      const speedNumber = new PIXI.Text(card.speed,
         {
            fontFamily: "tahoma,sans-serif",
            fontSize: 10,
            //fontWeight: '600',
            fill: "white",
            align: 'center'
         });
      speedNumber.anchor.set(0.5, 0.5);
      speedNumber.position.set(38.5 - 10, 126.5);
      cardContainer.addChild(speed);
      cardContainer.addChild(speedNumber);

      //Spirit
      if (card.spirit) {
         const spirit = new PIXI.Graphics();
         spirit.beginFill(0xb220d6);
         spirit.drawRoundedRect(
            26 - 10,
            145,
            25,
            14,
            10
         );
         spirit.endFill();
         const spiritNumber = new PIXI.Text(card.spirit,
            {
               fontFamily: "tahoma,sans-serif",
               fontSize: 10,
               //fontWeight: '600',
               fill: "white",
               align: 'center'
            });
         spiritNumber.anchor.set(0.5, 0.5);
         spiritNumber.position.set(38.5 - 10, 151.5);
         cardContainer.addChild(spirit);
         cardContainer.addChild(spiritNumber);
      }
      //Set card container scale
      cardContainer.scale.set(baseCardWidth / 200);

      //Set interaction
      cardContainer.interactive = true;

      return cardContainer;
   }

   drawCardLarge(card: baseCardMode, baseCardWidth: number = 200) {
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
      //Start PIXI JS code
      const cardContainer = new PIXI.Container();
      //Background
      let nameColor = "black";
      if (card.rarity > 1) {
         nameColor = "white";
      }

      let frameImage = PIXI.Sprite.from(cardFrameImage[card.rarity]);
      frameImage.position.set(100, 100);
      frameImage.anchor.set(0.5);
      frameImage.scale.set(0.5);

      const cardImage = PIXI.Sprite.from(card.image);
      cardImage.position.set(100, 100 + 7);
      cardImage.scale.set(0.48);
      cardImage.anchor.set(0.5);
      cardContainer.addChild(cardImage);
      cardContainer.addChild(frameImage);

      const cardName = new PIXI.Text(card.name + " [" + this.translateService.instant("gameBase.cardClassName_" + card.class) + "]",
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
         const abrasion = new PIXI.Graphics();
         abrasion.beginFill(0x37a7ed);
         abrasion.drawRoundedRect(
            146,
            17,
            28,
            16,
            20
         );
         abrasion.endFill();
         const abrasionNumber = new PIXI.Text(card.abrasion,
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
      const health = new PIXI.Graphics();
      health.beginFill(0xed5537);
      health.drawRoundedRect(
         22,
         171,
         35,
         18,
         30
      );
      health.endFill();
      const healthNumber = new PIXI.Text(card.health,
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
      const attack = new PIXI.Graphics();
      attack.beginFill(0xfc0303);
      attack.drawRoundedRect(
         26,
         70,
         25,
         14,
         10
      );
      attack.endFill();
      const attackNumber = new PIXI.Text(card.attack,
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
      const defense = new PIXI.Graphics();
      defense.beginFill(0xd1a221);
      defense.drawRoundedRect(
         26,
         95,
         25,
         14,
         10
      );
      defense.endFill();
      const defenseNumber = new PIXI.Text(card.defense,
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
      const speed = new PIXI.Graphics();
      speed.beginFill(0x47d121);
      speed.drawRoundedRect(
         26,
         120,
         25,
         14,
         10
      );
      speed.endFill();
      const speedNumber = new PIXI.Text(card.speed,
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
         const spirit = new PIXI.Graphics();
         spirit.beginFill(0xb220d6);
         spirit.drawRoundedRect(
            26,
            145,
            25,
            14,
            10
         );
         spirit.endFill();
         const spiritNumber = new PIXI.Text(card.spirit,
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
      cardContainer.scale.set(baseCardWidth / 200);

      //Set interaction
      cardContainer.interactive = true;
      return cardContainer;
   }


   onClickGetLargeWithoutButton(card: baseCardMode, pixi: PIXI.Application, cardWidth: number, screenWidth: number) {
      //Mask
      const backgroundMask = new PIXI.Graphics();
      backgroundMask.beginFill(0xeeeeee, 0.85);
      backgroundMask.drawRoundedRect(0, 0, parseInt(pixi.view.style.width.slice(0, -2)), parseInt(pixi.view.style.height.slice(0, -2)), 0);
      backgroundMask.endFill();
      backgroundMask.interactive = true;
      pixi.stage.addChild(backgroundMask);

      if (cardWidth * 2 * 1.75 < screenWidth) {
         cardWidth = cardWidth * 1.75;
      } else if (cardWidth * 1.25 * 2 < screenWidth) {
         cardWidth = cardWidth * 1.25;
      }
      //Card Container
      const largeCardContainer = new PIXI.Container();
      largeCardContainer.interactive = true;
      largeCardContainer.position.set(parseInt(pixi.view.style.width.slice(0, -2)) / 2 - cardWidth, parseInt(pixi.view.style.height.slice(0, -2)) / 2 - cardWidth * 0.75);

      const largeCardBackgroundPanel = new PIXI.Graphics();
      largeCardBackgroundPanel.lineStyle(2, this.publicFunctionService.getCardBorderColorFromRarity(card.rarity), 1);
      largeCardBackgroundPanel.beginFill(0xcccccc,);
      largeCardBackgroundPanel.drawRoundedRect(2, 2, cardWidth * 2, cardWidth * 1.5, 10);
      largeCardBackgroundPanel.endFill();
      let cardContainerLarge = this.drawCardLarge(card, cardWidth);
      cardContainerLarge.position.set(5, cardWidth / 4);
      largeCardContainer.addChild(largeCardBackgroundPanel);
      largeCardContainer.addChild(cardContainerLarge);


      pixi.stage.addChild(largeCardContainer);
      backgroundMask.on('pointerdown', () => {
         this.onClickRemoveLargeCardAndMask(pixi, backgroundMask, largeCardContainer);
      });
   }


   private onClickRemoveLargeCardAndMask(pixi: PIXI.Application, mask: PIXI.Graphics, largeContainer: PIXI.Container) {
      pixi.stage.removeChild(mask);
      pixi.stage.removeChild(largeContainer);
   }
}
