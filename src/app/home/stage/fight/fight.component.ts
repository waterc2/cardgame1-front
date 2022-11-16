import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { pixiService } from 'src/app/service/pixi.service';
import { gameStage, baseMap, GlobalConstants } from 'src/app/share/models';
import { baseCardMode, fightMode, fightStatusMode } from 'src/app/share/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as PIXI from 'pixi.js';
//import { Sprite } from 'pixi.js';

@Component({
   selector: 'app-fight',
   templateUrl: './fight.component.html',
   styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
   public disableNavbar = true;
   public fightData: fightMode;
   @ViewChild("fightGrid") allCardDiv: ElementRef;

   renderer: PIXI.Application;
   enemyBase: PIXI.Container = new PIXI.Container();
   fightGround: PIXI.Container = new PIXI.Container();
   myBase: PIXI.Container = new PIXI.Container();
   myInfo: PIXI.Container = new PIXI.Container();
   myCards: PIXI.Container = new PIXI.Container();
   popupBase: PIXI.Container = new PIXI.Container();
   baseCardWidth: number;
   baseMultiplier: number;
   closeResult = '';
   windowInnerWidth = Math.round(window.innerWidth * 0.99);
   windowInnerHeight = Math.round(window.innerHeight) - 66;


   iconMagic: string = GlobalConstants.imageURL + '/icons/magic.svg';
   iconDefense: string = GlobalConstants.imageURL + '/icons/defense.svg';

   iconCards = PIXI.Sprite.from(GlobalConstants.imageURL + '/icons/cards.png');
   iconHealth = PIXI.Sprite.from(GlobalConstants.imageURL + '/icons/heart.png');

   constructor(
      private apiService: ApiService,
      private pixiService: pixiService,
      private translateService: TranslateService
   ) { }

   ngOnInit() {// Fetching
      this.apiService.getFight$().subscribe((next) => {
         setTimeout(() => {
            this.fightData = next['fight'];
            console.log(this.fightData);
            this.drawBase();
         }, 0);
      });
   }

   drawBase() {
      if (this.windowInnerWidth < 600) {
         this.baseCardWidth = 80;
         this.baseMultiplier = 2;
      } else if (this.windowInnerWidth < 1200) {
         this.baseCardWidth = 120;
         this.baseMultiplier = 3;
      }
      else if (this.windowInnerWidth < 2000) {
      this.baseCardWidth = 160;
      this.baseMultiplier = 4;
      }
      else {
         this.baseCardWidth = 200;
         this.baseMultiplier = 5;
      }
      this.renderer = new PIXI.Application({
         width: this.windowInnerWidth, height: this.windowInnerHeight, backgroundColor: 0xffffff,
         autoDensity: true,
         resolution: window.devicePixelRatio,
         backgroundAlpha: 0,
      });
      if (this.fightData.stageData.currentStage == 0) {
         this.drawCardInitBase();
      } else {

         this.drawEnemyBase();
      }
      this.allCardDiv.nativeElement.appendChild(this.renderer.view);
   }

   drawCardInitBase() {
      //this.popupBase

      const pageTitleText = new PIXI.Text(this.translateService.instant('gameBase.selectInitCards'),
         {
            fontSize: this.baseMultiplier * 16,
            fill: "#333333",
            align: 'center',
            lineJoin: 'round',
         });
      pageTitleText.anchor.set(0.5);
      pageTitleText.position.set(this.windowInnerWidth / 2, this.baseMultiplier * 40);
      this.popupBase.addChild(pageTitleText);
      this.renderer.stage.addChild(this.popupBase);
      let cardSelectContainer :PIXI.Container;

      cardSelectContainer = this.pixiService.drawCardsMultiSelect(this.fightData.myHandCards, this.renderer, this.baseCardWidth * 1.5,this.windowInnerWidth , this.fightData.myHandCards.length);
      console.log(this.baseCardWidth);

      cardSelectContainer.position.set(0,this.baseMultiplier * 60 );
      this.popupBase.addChild(cardSelectContainer);

       
   }

   drawEnemyBase() {
      this.iconHealth.anchor.set(0.5);
      this.iconHealth.scale.set(0.25);
      this.iconHealth.x = this.baseMultiplier * 20;
      this.iconHealth.y = this.baseMultiplier * 10;

      this.iconCards.anchor.set(0.5);
      this.iconCards.scale.set(0.25);
      this.iconCards.x = this.baseMultiplier * 60 + this.baseMultiplier * 20;
      this.iconCards.y = this.baseMultiplier * 10;

      //enemy health
      const enemyHealthText = new PIXI.Text(this.fightData.enemyStatus.currentHP,
         {
            fontSize: this.baseMultiplier * 12,
            fill: "#333333",
            align: 'center',
            lineJoin: 'round',
         });
      enemyHealthText.anchor.set(0.5);
      enemyHealthText.position.set(this.baseMultiplier * 40, this.baseMultiplier * 10);

      //enemy health
      const enemyCardsText = new PIXI.Text(this.fightData.enemyStatus.cardLeft,
         {
            fontSize: this.baseMultiplier * 12,
            fill: "#333333",
            align: 'center',
            lineJoin: 'round',
         });
      enemyCardsText.anchor.set(0.5);
      enemyCardsText.position.set(this.baseMultiplier * 100, this.baseMultiplier * 10);

      this.enemyBase.addChild(this.iconHealth);
      this.enemyBase.addChild(enemyHealthText);
      this.enemyBase.addChild(this.iconCards);
      this.enemyBase.addChild(enemyCardsText);

      this.renderer.stage.addChild(this.enemyBase);
   }

}
