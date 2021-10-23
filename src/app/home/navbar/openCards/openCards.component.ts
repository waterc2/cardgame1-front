import { ModalCardWindowComponent } from './modalCardWindow/modalCardWindow.component';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { baseCardMode } from 'src/app/share/models'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-openCards',
  templateUrl: './openCards.component.html',
  styleUrls: ['./openCards.component.scss'],
  animations: [
    trigger('animateDestroy', [
      state('void', style({ opacity: '0' })),
      transition('* => void', animate('300ms ease'))
    ])
  ]
})
export class OpenCardsComponent implements OnInit {
  public allCards: Array<baseCardMode> = [];
  closeResult = '';

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadAllMyCards();
  }

  loadAllMyCards() {
    this.apiService.getAllMyCards$()
      .subscribe((next: baseCardMode[][]) => {
        setTimeout(() => {
          this.allCards = next[0];
          //console.log(this.allCards[0]);
        }, 0);
      }
      );
  }

  cardWindow(cardIndex:number)
  {
    console.log(this.allCards[cardIndex]);
    const modalRef = this.modalService.open(ModalCardWindowComponent, { size: 'lg', animation: true, centered: true, keyboard: false, });
    modalRef.componentInstance.card = this.allCards[cardIndex];

    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = this.getDismissReason(reason);
      if(this.closeResult === 'nothing'){

      }else{
        this.allCards.splice(cardIndex, 1);
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //   //this.router.navigate(['home/navbar/openPackage'], { skipLocationChange: true });
        // });
      }
    });
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
