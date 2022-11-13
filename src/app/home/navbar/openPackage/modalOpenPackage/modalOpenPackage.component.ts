import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { baseCardMode, basePackageMode } from 'src/app/share/models'
import { pixiService } from 'src/app/service/pixi.service';
import { TranslateService } from '@ngx-translate/core';
import * as PIXI from 'pixi.js'

@Component({
   selector: 'app-modalOpenPackage',
   templateUrl: './modalOpenPackage.component.html',
   styleUrls: ['./modalOpenPackage.component.scss'],
})
export class ModalOpenPackageComponent implements OnInit {
   @Input() package: basePackageMode;
   @Input() cards: baseCardMode[];
   @ViewChild("openCardDiv") openCardDiv: ElementRef;


   windowInnerWidth: number;
   windowInnerHeight: number;

   currentCardIndex: number = 0;
   renderer: PIXI.Application;
   cardContainer: PIXI.Container;

   openStatus: number = 1;

   constructor(
      public activeModal: NgbActiveModal,
      private pixiService: pixiService,
      private translateService: TranslateService,
      private apiService: ApiService
   ) { }

   ngOnInit() {
   }

   confirmOpen(p_id: number) {
      this.apiService.postOpenPackage$(p_id)
         .subscribe((next: baseCardMode[][]) => {
            setTimeout(() => {
               this.cards = next[0];
               this.drawCardArea();
               this.openStatus = 2;
            }, 0);
         }
         );
   }

   private drawCardArea() {
      this.windowInnerWidth = this.openCardDiv.nativeElement.offsetWidth;
      this.windowInnerHeight = this.openCardDiv.nativeElement.offsetHeight;
      this.renderer = new PIXI.Application({
         width: this.windowInnerWidth * 0.99, height: this.windowInnerHeight < this.windowInnerWidth / 1.5 ? this.windowInnerWidth * 0.7 : this.windowInnerHeight * 0.99, backgroundColor: 0xffffff,
         autoDensity: true,
         resolution: window.devicePixelRatio,
         backgroundAlpha: 0,
      });

      this.drawCardContainers();
      this.openCardDiv.nativeElement.innerHTML = '';
      this.openCardDiv.nativeElement.appendChild(this.renderer.view);
   }

   private drawCardContainers() {
      this.cardContainer = this.drawLargeCard(this.cards[this.currentCardIndex], this.cards.length != this.currentCardIndex + 1);
      this.renderer.stage.addChild(this.cardContainer);
   }

   private drawLargeCard(card: baseCardMode, hasNext: boolean = true) {
      const baseCardContainer = new PIXI.Container();
      let cardContainerLarge = this.pixiService.drawCardLarge(card, this.windowInnerWidth / 2.5, this.renderer);
      cardContainerLarge.position.set(5, this.windowInnerWidth / 10);

      const blurFilter1 = new PIXI.filters.BlurFilter();
      cardContainerLarge.filters = [blurFilter1];

      let count = 60;      
      let speed = 2 / Math.pow(2, card.rarity) + 0.05;

      const filterAnimationUpdate = () => {
         if (count > 0) {
            count -= speed
            blurFilter1.blur = count;
         } else {
            cardContainerLarge.filters = [];
            this.renderer.ticker.remove(filterAnimationUpdate);

            const nextButtonContainer = new PIXI.Container();
            nextButtonContainer.position.set(this.windowInnerWidth - this.windowInnerWidth / 4 - this.windowInnerWidth / 8, this.windowInnerHeight - this.windowInnerWidth / 8);
            baseCardContainer.addChild(nextButtonContainer);

            const nextButton = new PIXI.Graphics();
            nextButton.beginFill(0x0c753f);
            nextButton.drawRoundedRect(0, 0, this.windowInnerWidth / 4, this.windowInnerWidth / 16, 10);
            nextButton.endFill();
            nextButton.interactive = true;
            nextButton.cursor = 'pointer';
            const buttonText = hasNext ? this.translateService.instant('common.nextCard') : this.translateService.instant('common.close');
            const nextCardText = new PIXI.Text(buttonText,
               {
                  fontFamily: "Hiragino Sans GB",
                  fontSize: 12,
                  fill: "white",
                  align: 'center',
                  strokeThickness: 1,
                  dropShadow: true,
                  dropShadowColor: '#aaaaaa',
                  dropShadowBlur: 2,
                  dropShadowAngle: Math.PI / 6,
                  dropShadowDistance: 4,
                  wordWrap: true,
                  wordWrapWidth: 440,
                  lineJoin: 'round',
               });
            nextCardText.anchor.set(0.5)
            nextCardText.position.set(this.windowInnerWidth / 8, this.windowInnerWidth / 32);

            nextButtonContainer.addChild(nextButton);
            nextButtonContainer.addChild(nextCardText);

            nextButton.on('pointerdown', () => {
               if (hasNext) {
                  this.showNextCard();
               } else {
                  this.closeWindow();
               }
            });
         }
      }

      cardContainerLarge.on('pointerdown', () => {
         count = 0;
      });
      this.renderer.ticker.add(filterAnimationUpdate);
      baseCardContainer.addChild(cardContainerLarge);

      return baseCardContainer;
   }

   private showNextCard() {
      this.currentCardIndex++;
      this.renderer.stage.removeChildAt(0);
      this.cardContainer = this.drawLargeCard(this.cards[this.currentCardIndex], this.cards.length != (this.currentCardIndex +1 ));      
      this.renderer.stage.addChild(this.cardContainer);
   }

   private closeWindow() {
      this.activeModal.dismiss('close');
   }

}
