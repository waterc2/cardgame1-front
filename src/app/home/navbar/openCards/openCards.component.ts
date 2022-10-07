import { ModalCardWindowComponent } from './modalCardWindow/modalCardWindow.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { pixiService } from 'src/app/service/pixi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseCardMode } from 'src/app/share/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as PIXI from 'pixi.js'
import * as PIXIprojection from 'pixi-projection'
//import * as application from '@pixi/display';


@Component({
  selector: 'app-openCards',
  templateUrl: './openCards.component.html',
  styleUrls: ['./openCards.component.scss'],
})
export class OpenCardsComponent implements OnInit {
  public allCards: Array<baseCardMode> = [];
  public allHandCards: Array<baseCardMode> = [];
  baseCardWidth = 120;
  baseCardHeight = 150;
  closeResult = '';
  windowInnerWidth = Math.round(window.innerWidth * 0.99);
  windowInnerHeight = Math.round(window.innerHeight) - 56;
  @ViewChild("allCardDiv") allCardDiv: ElementRef;

  renderer: PIXI.Application;
  allCardContainer: PIXI.Container;
  allHandCardContainer: PIXI.Container;

  constructor(
    private apiService: ApiService,
    private pixiService: pixiService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit() {
    console.log(this.windowInnerWidth, window.innerWidth);

    if (this.windowInnerWidth < 1300) {
      this.baseCardWidth = 80;
      this.baseCardHeight = 100;
    }
    else if (this.windowInnerWidth > 2000) {
      this.baseCardWidth = 160;
      this.baseCardHeight = 200;
    }
    this.getAllHandCards();
  }

  loadAllMyCards() {
    this.apiService.getAllMyCards$().subscribe((next: baseCardMode[][]) => {
      setTimeout(() => {
        this.allCards = next[0];
        this.drawBackground();
      }, 0);
    });
  }

  getAllHandCards() {
    this.apiService.getAllHandCards$().subscribe((next: baseCardMode[][]) => {
      setTimeout(() => {
        this.allHandCards = next[0];
        this.loadAllMyCards();
      }, 0);
    });
  }

  // cardWindow(cardIndex: number, buttons: number) {
  //   //console.log(cardIndex);
  //   const modalRef = this.modalService.open(ModalCardWindowComponent, {
  //     size: 'lg',
  //     animation: true,
  //     centered: true,
  //     keyboard: false,
  //   });
  //   if (buttons === 1) {
  //     modalRef.componentInstance.card = this.allCards[cardIndex];
  //   } else {
  //     modalRef.componentInstance.card = this.allHandCards[cardIndex];
  //   }
  //   modalRef.componentInstance.buttons = buttons;
  //   modalRef.result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason) => {
  //       this.closeResult = this.getDismissReason(reason);
  //       if (this.closeResult === 'nothing') {
  //       } else {
  //         this.apiService
  //           .postPutCardToHand$(this.allCards[cardIndex].cardId)
  //           .subscribe((next) => {
  //             setTimeout(() => {
  //               if (next.hasOwnProperty('error')) {
  //                 this.toastr.error(
  //                   this.translateService.instant('gameBase.' + next.error)
  //                 );
  //               } else {
  //                 this.allHandCards.push(this.allCards[cardIndex]);
  //                 this.allCards.splice(cardIndex, 1);
  //               }
  //             }, 0);
  //           });
  //       }
  //     }
  //   );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'nothing';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'nothing';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  private drawBackground() {
    this.renderer = new PIXI.Application({
      width: this.windowInnerWidth, height: this.windowInnerHeight, backgroundColor: 0xffffff,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundAlpha: 0,
    });

    this.allCardContainer = new PIXI.Container();
    this.allHandCardContainer = new PIXI.Container();

    const handCardPanel = new PIXI.Graphics();
    handCardPanel.lineStyle(2, 0xE84C4C, 1);
    handCardPanel.beginFill(0x650A5A, 0.25);
    handCardPanel.drawRoundedRect(5, 5, this.windowInnerWidth - 6, this.baseCardHeight * 1.5 + 10, 20);
    handCardPanel.endFill();

    const pagesAndLines = this.howManyCardEachPage(this.allCards.length);

    const allCardPanel = new PIXI.Graphics();
    allCardPanel.lineStyle(2, 0x999999, 1);
    allCardPanel.beginFill(0x650A5A, 0.25);
    allCardPanel.drawRoundedRect(5, 5, this.windowInnerWidth - 6, pagesAndLines[1] * this.baseCardHeight, 20);
    allCardPanel.endFill();

    this.allHandCardContainer.addChild(handCardPanel);
    this.allCardContainer.position.set(0, this.baseCardHeight * 1.5 + 15);
    this.allCardContainer.addChild(allCardPanel);

    this.renderer.stage.addChild(this.allHandCardContainer);
    this.renderer.stage.addChild(this.allCardContainer);

    // hard Card title
    const handCardTitleContainer = new PIXI.Container();
    this.allHandCardContainer.addChild(handCardTitleContainer);
    const handCardTitleText = new PIXI.Text("手牌",
      {
        fontFamily: "Hiragino Sans GB",
        fontSize: 12,
        fill: "#333333",
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
    handCardTitleText.position.set(10, 10);
    handCardTitleContainer.addChild(handCardTitleText);
    const cardNumberColor = this.allHandCards.length > 10 ? 'grey' : 'red';
    const cardNumberText = new PIXI.Text(this.allHandCards.length + " / 15",
      {
        fontFamily: "Hiragino Sans GB",
        fontSize: 11,
        fill: cardNumberColor,
        align: 'center',
        strokeThickness: 1,
      });
    cardNumberText.position.set(50, 12);
    handCardTitleContainer.addChild(cardNumberText);

    // all Card Title
    const allCarditleContainer = new PIXI.Container();
    this.allCardContainer.addChild(allCarditleContainer);
    const allCardTitleText = new PIXI.Text("全部",
      {
        fontFamily: "Hiragino Sans GB",
        fontSize: 12,
        fill: "#333333",
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
    allCardTitleText.position.set(10, 10);
    allCarditleContainer.addChild(allCardTitleText);
    const allCardNumberColor = this.allHandCards.length > 50 ? 'red' : 'grey';
    const allCardNumberText = new PIXI.Text(this.allCards.length + " / 60",
      {
        fontFamily: "Hiragino Sans GB",
        fontSize: 11,
        fill: allCardNumberColor,
        align: 'center',
        strokeThickness: 1,
      });
    allCardNumberText.position.set(50, 12);
    allCarditleContainer.addChild(allCardNumberText);

    let x = this.baseCardWidth, y = 0;
    for (let key of this.allCards.keys()) {
      let cardContainer = this.pixiService.drawCard(this.allCards[key], this.baseCardHeight);
      cardContainer.position.set(x, y);
      cardContainer.on('pointerdown', () => {
        this.onClickGetLargeOne(this.allCards[key], key);
      });
      this.allCardContainer.addChild(cardContainer);
      this.allCardDiv.nativeElement.appendChild(this.renderer.view);
      x += this.baseCardWidth;
      if ((x + this.baseCardWidth) > this.windowInnerWidth) {
        x = 0;
        y += this.baseCardHeight
      }
    }
  }

  private howManyCardEachPage(count: number) {
    const eachLine = Math.floor((this.windowInnerWidth - 6) / this.baseCardWidth);
    const howManyLine = Math.floor((this.windowInnerHeight - this.baseCardHeight * 1.5 - 20) / this.baseCardHeight);
    const pages = Math.ceil(count / (eachLine * howManyLine - 1));
    console.log(eachLine, howManyLine, pages);
    return [pages, howManyLine];
  }

  private onClickRemoveLargeCardAndMask(mask: PIXI.Graphics, largeContainer: PIXI.Container) {
    this.renderer.stage.removeChild(mask);
    this.renderer.stage.removeChild(largeContainer);
  }

  private onClickGetLargeOne(card: baseCardMode, key:number) {
    //Mask
    const backgroundMask = new PIXI.Graphics();
    backgroundMask.beginFill(0xeeeeee, 0.5);
    backgroundMask.drawRoundedRect(0, 0, parseInt(this.renderer.view.style.width.slice(0, -2)), parseInt(this.renderer.view.style.height.slice(0, -2)), 0);
    backgroundMask.endFill();
    backgroundMask.interactive = true;
    backgroundMask.buttonMode = true;
    this.renderer.stage.addChild(backgroundMask);


    //Card Container
    const largeCardContainer = new PIXI.Container();
    largeCardContainer.interactive = true;
    largeCardContainer.position.set(parseInt(this.renderer.view.style.width.slice(0, -2)) / 2 - (this.baseCardWidth * 2.5), parseInt(this.renderer.view.style.height.slice(0, -2)) / 2 - this.baseCardHeight * 1.5);

    //console.log(parseInt(this.renderer.view.style.width.slice(0,-2))/2 - (this.baseCardWidth*2.5)/2, parseInt(this.renderer.view.style.height.slice(0,-2))/2 - this.baseCardHeight*1.5/2);

    const largeCardBackgroundPanel = new PIXI.Graphics();
    largeCardBackgroundPanel.beginFill(0xcccccc,);
    largeCardBackgroundPanel.drawRoundedRect(2, 2, this.baseCardWidth * 2.5 * 2, this.baseCardHeight * 1.5 * 2, 10);
    largeCardBackgroundPanel.endFill();
    let cardContainerLarge = this.pixiService.drawCardLarge(card, this.baseCardWidth, this.renderer);
    cardContainerLarge.position.set(5, this.baseCardHeight / 2);
    largeCardContainer.addChild(largeCardBackgroundPanel);
    largeCardContainer.addChild(cardContainerLarge);

    //bottom buttons 
    const addToHandButton = new PIXI.Graphics();
    addToHandButton.beginFill(0x0c753f);
    addToHandButton.drawRoundedRect(this.baseCardWidth * 2.5 - 50, this.baseCardHeight * 1.5 * 2 - 40, 100, 30, 10);
    addToHandButton.endFill();
    addToHandButton.interactive = true;
    addToHandButton.buttonMode = true;
    const addCardToHandText = new PIXI.Text("加入手牌",
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
    addCardToHandText.anchor.set(0.5)
    addCardToHandText.position.set(this.baseCardWidth * 2.5, this.baseCardHeight * 1.5 * 2 - 25);
    addToHandButton.addChild(addCardToHandText);
    addToHandButton.on('pointerdown', () => {
      this.onClickAddCardToHand( key, backgroundMask, largeCardContainer);
    });
    largeCardContainer.addChild(addToHandButton);




    this.renderer.stage.addChild(largeCardContainer);
    backgroundMask.on('pointerdown', () => {
      this.onClickRemoveLargeCardAndMask(backgroundMask, largeCardContainer);
    });
  }

  private onClickAddCardToHand( key:number, mask: PIXI.Graphics, largeContainer: PIXI.Container) {
    this.apiService
      .postPutCardToHand$(this.allCards[key].cardId)
      .subscribe((next) => {
        setTimeout(() => {
          if (next.hasOwnProperty('error')) {
            this.toastr.error(
              this.translateService.instant('gameBase.' + next.error)
            );
          } else {
            this.allHandCards.push(this.allCards[key]);
            this.allCards.splice(key, 1);
          }
          
          this.onClickRemoveLargeCardAndMask(mask, largeContainer);
        }, 0);
      });

  }
}