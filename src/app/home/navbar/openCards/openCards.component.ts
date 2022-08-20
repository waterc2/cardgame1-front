import { ModalCardWindowComponent } from './modalCardWindow/modalCardWindow.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { pixiService } from 'src/app/service/pixi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseCardMode } from 'src/app/share/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import * as PIXI from 'pixi.js'

@Component({
  selector: 'app-openCards',
  templateUrl: './openCards.component.html',
  styleUrls: ['./openCards.component.scss'],
})
export class OpenCardsComponent implements OnInit {
  public allCards: Array<baseCardMode> = [];
  public allHandCards: Array<baseCardMode> = [];
  baseCardWidth = 200;
  closeResult = '';
  windowInnerWidth = window.innerWidth - 10;
  renderer: PIXI.Application;
  @ViewChild("allCardDiv") allCardDiv: ElementRef;

  constructor(
    private apiService: ApiService,
    private pixiService: pixiService,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.windowInnerWidth < 600)
      this.baseCardWidth = 100;
    else if (this.windowInnerWidth > 1300)
      this.baseCardWidth = 300;

    this.loadAllMyCards();
    this.getAllHandCards();
  }

  loadAllMyCards() {
    this.apiService.getAllMyCards$().subscribe((next: baseCardMode[][]) => {
      setTimeout(() => {
        this.allCards = next[0];
        this.renderer = new PIXI.Application({
          width: this.windowInnerWidth, height: this.cardAreaHight(this.allCards.length), backgroundColor: 0xffffff,
          autoDensity: true,
          resolution: window.devicePixelRatio,
          backgroundAlpha: 0,
        });
        let x = 0, y = 0;

        for (let value of this.allCards) {
          let cardContainer = this.pixiService.drawCard(value, this.baseCardWidth);
          cardContainer.position.set(x, y);

          cardContainer.on('pointerdown', () =>{
            this.onClickGetLargeOne(value);
        });

          
          this.renderer.stage.addChild(cardContainer);
          this.allCardDiv.nativeElement.appendChild(this.renderer.view);
          x += this.baseCardWidth;
          if ((x + this.baseCardWidth) > this.windowInnerWidth) {
            x = 0;
            y += this.baseCardWidth
          }
        }

      }, 0);
    });
  }

  getAllHandCards() {
    this.apiService.getAllHandCards$().subscribe((next: baseCardMode[][]) => {
      setTimeout(() => {
        this.allHandCards = next[0];
        //console.log(next[0]);
      }, 0);
    });
  }

  cardWindow(cardIndex: number, buttons: number) {
    //console.log(cardIndex);
    const modalRef = this.modalService.open(ModalCardWindowComponent, {
      size: 'lg',
      animation: true,
      centered: true,
      keyboard: false,
    });
    if (buttons === 1) {
      modalRef.componentInstance.card = this.allCards[cardIndex];
    } else {
      modalRef.componentInstance.card = this.allHandCards[cardIndex];
    }
    modalRef.componentInstance.buttons = buttons;
    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = this.getDismissReason(reason);
        if (this.closeResult === 'nothing') {
        } else {
          this.apiService
            .postPutCardToHand$(this.allCards[cardIndex].cardId)
            .subscribe((next) => {
              setTimeout(() => {
                if (next.hasOwnProperty('error')) {
                  this.toastr.error(
                    this.translateService.instant('gameBase.' + next.error)
                  );
                } else {
                  this.allHandCards.push(this.allCards[cardIndex]);
                  this.allCards.splice(cardIndex, 1);
                }
              }, 0);
            });
        }
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'nothing';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'nothing';
    } else {
      return `with: ${reason}`;
    }
  }

  private cardAreaHight(cardCount: number): number {
    return cardCount / Math.floor(this.windowInnerWidth / this.baseCardWidth) * this.baseCardWidth + this.baseCardWidth;
  }

  private onClickGetLargeOne(card:baseCardMode)
  {
    console.log(card);
    
    let cardContainerLarge = this.pixiService.drawCardLarge(card, this.baseCardWidth, this.renderer);
    this.renderer.stage.addChild(cardContainerLarge);
  }
}