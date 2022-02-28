import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { basePackageMode } from 'src/app/share/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalOpenPackageComponent } from './modalOpenPackage/modalOpenPackage.component';
@Component({
  selector: 'app-openPackage',
  templateUrl: './openPackage.component.html',
  styleUrls: ['./openPackage.component.scss'],
})
export class OpenPackageComponent implements OnInit {
  public availablePackages: Array<any> = [];
  public returnResult = 0;
  closeResult = '';
  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadAllPackage();
  }

  loadAllPackage() {
    this.apiService.getAvailablePackage$().subscribe((next) => {
      setTimeout(() => {
        this.returnResult = 1;
        next[0].forEach((element: any) => {
          let newData: basePackageMode = {
            image: `http://127.0.0.1/storage/assets/game_bag${element.p_rare}.png`,
            name: 'gameBase.cardPackageName' + element.p_rare,
            id: element.p_id,
            level: element.p_level,
            rare: element.p_rare,
            value: element.p_value,
            class: element.p_class,
          };
          let classArray = newData.class.split(',');
          newData.class = '';
          classArray.forEach((element) => {
            newData.class +=
              this.translateService.instant(
                'gameBase.cardClassName_' + element
              ) + ' ';
          });
          this.availablePackages.push(newData);
        });
      }, 0);
    });
  }

  open(item: basePackageMode) {
    const modalRef = this.modalService.open(ModalOpenPackageComponent, {
      size: 'lg',
      backdrop: 'static',
      animation: true,
      centered: true,
      keyboard: false,
    });
    modalRef.componentInstance.package = item;

    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        //refresh
        this.spinnerService.show();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['home/navbar/openPackage'], {
              skipLocationChange: true,
            });
          });
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
