import { ModalCardWindowComponent } from './modalCardWindow/modalCardWindow.component';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
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

@Component({
  selector: 'app-openCards',
  templateUrl: './openCards.component.html',
  styleUrls: ['./openCards.component.scss'],
  animations: [
    trigger('animateDestroy', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(400, style({ opacity: 0 }))),
    ]),
  ],
})
export class OpenCardsComponent implements OnInit {
  public allCards: Array<baseCardMode> = [];
  public allHandCards: Array<baseCardMode> = [];
  closeResult = '';

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadAllMyCards();
    this.getAllHandCards();
  }

  loadAllMyCards() {
    this.apiService.getAllMyCards$().subscribe((next: baseCardMode[][]) => {
      setTimeout(() => {
        this.allCards = next[0];
        //console.log(this.allCards[0]);
      }, 0);
    });
  }

  getAllHandCards() {
    this.apiService.getAllHandCards$().subscribe((next: baseCardMode[][]) => {
      setTimeout(() => {
        this.allHandCards = next[0];
        //console.log(this.allCards[0]);
      }, 0);
    });
  }

  cardWindow(cardIndex: number, buttons: number) {
    console.log(cardIndex);
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
          console.log();
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
}
