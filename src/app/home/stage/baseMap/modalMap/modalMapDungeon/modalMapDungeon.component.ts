import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modalMapDungeon',
  templateUrl: './modalMapDungeon.component.html',
  styleUrls: ['./modalMapDungeon.component.scss']
})
export class ModalMapDungeonComponent implements OnInit {

  @Input() mapEvent: any;
  constructor(public modal: NgbActiveModal,
    private translateService: TranslateService,
    ) { }

  ngOnInit() {
  }

}
