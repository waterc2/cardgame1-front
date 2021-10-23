import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { baseCardMode } from 'src/app/share/models'

@Component({
  selector: 'app-modalCardWindow',
  templateUrl: './modalCardWindow.component.html',
  styleUrls: ['./modalCardWindow.component.scss']
})
export class ModalCardWindowComponent implements OnInit {
  @Input() card: baseCardMode;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log(this.card);
  }
  putIntoHand(){
    this.activeModal.dismiss('putIntoHand');
  }
}
