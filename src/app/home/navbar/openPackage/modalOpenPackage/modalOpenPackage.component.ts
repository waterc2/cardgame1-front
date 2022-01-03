import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { baseCardMode, basePackageMode } from 'src/app/share/models';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-modalOpenPackage',
  templateUrl: './modalOpenPackage.component.html',
  styleUrls: ['./modalOpenPackage.component.scss'],
})
export class ModalOpenPackageComponent implements OnInit {
  @Input() package: basePackageMode;
  @Input() cards: baseCardMode[];
  currentCardNumber: number = 0;
  currentNextButton: string = 'common.nextCard';

  openStatus: number = 1;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}

  ngOnInit() {}

  confirmOpen(p_id: number) {
    this.apiService
      .postOpenPackage$(p_id)
      .subscribe((next: baseCardMode[][]) => {
        setTimeout(() => {
          this.cards = next[0];
          this.openStatus = 2;
        }, 0);
      });
  }

  nextCard() {
    if (this.cards.length > 0) {
      if (this.currentCardNumber + 1 === this.cards.length) {
        //close window
        this.activeModal.dismiss('close');
      } else if (this.currentCardNumber + 3 === this.cards.length) {
        this.currentNextButton = 'common.theLastCard';
        this.currentCardNumber++;
      } else if (this.currentCardNumber + 2 === this.cards.length) {
        this.currentNextButton = 'common.close';
        this.currentCardNumber++;
      } else {
        this.currentCardNumber++;
      }
    }
  }
}
