import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { baseCardMode } from 'src/app/share/models';

@Component({
  selector: 'app-modalCardWindow',
  templateUrl: './modalCardWindow.component.html',
  styleUrls: ['./modalCardWindow.component.scss'],
})
export class ModalCardWindowComponent implements OnInit {
  @Input() card: baseCardMode;
  @Input() buttons: number;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
  putIntoHand() {
    this.activeModal.dismiss('putIntoHand');
  }
}
