import { map } from 'rxjs/operators';
import { ApiService } from '../../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gameStage, baseMap, GlobalConstants } from 'src/app/share/models';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ModalMapDungeonComponent } from './modalMap/modalMapDungeon/modalMapDungeon.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-baseMap',
  templateUrl: './baseMap.component.html',
  styleUrls: ['./baseMap.component.scss'],
})
export class BaseMapComponent implements OnInit {
  public stage: gameStage;
  public showButtons: Array<number>;
  public currentMap: baseMap;
  public background: string;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    public router: Router) { }

  ngOnInit() {
    // Fetching
    this.apiService.getStage$().subscribe((next) => {
      setTimeout(() => {
        this.stage = next.stage;
      }, 0);
    });
    this.apiService.getMapData$().subscribe((next) => {
      setTimeout(() => {
        this.currentMap = next.map
        console.log(this.currentMap);
      }, 0);
    });
  }

  mapEvent(mapEventIndex: number) {
    console.log(this.currentMap['map_data'][mapEventIndex]);
    switch (this.currentMap['map_data'][mapEventIndex].e_type) {
      case 2://open dungeon window

        const modalRef = this.modalService.open(ModalMapDungeonComponent, {
          size: 'sm',
          backdrop: 'static',
          animation: true,
          centered: true,
          keyboard: false,
        });
        modalRef.componentInstance.mapEvent = this.currentMap['map_data'][mapEventIndex];
        modalRef.closed.subscribe((message: string) => {
          if (message === "Ok") {
            //start

            this.apiService.postTriggerMapEvent$(mapEventIndex)
              .subscribe((next) => {
                setTimeout(() => {
                  console.log(next);
                }, 0);
              }
              );
          }
        });
        break;
    }
  }
}
