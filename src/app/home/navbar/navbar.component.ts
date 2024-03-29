import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faMapMarked,
  faGift,
  faLayerGroup,
  faUser,
  faGears
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/service/api.service';
import { gameStage } from 'src/app/share/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faMap = faMapMarked;
  faPackage = faGift;
  faCard = faLayerGroup;
  faAccount = faUser;
  faGears = faGears;
  public availablePackage: number;
  public onhandCard: number;
  public availableCard: number;
  //TODO: don't input for others, call API to get stage
  @Input() disableNavbar:boolean = false;

  constructor(private apiService: ApiService, public router: Router) {}

  openPackages() {
    this.router.navigate(['home/navbar/openPackage'], {
      skipLocationChange: true,
    });
  }

  loginOut() {
    this.router.navigate(['home/navbar/loginOut'], {
      skipLocationChange: true,
    });
  }

  newStart() {
    this.router.navigate(['home/navbar/newStart'], {
      skipLocationChange: true,
    });
  }

  openCards() {
    this.router.navigate(['home/navbar/openCards'], {
      skipLocationChange: true,
    });
  }

  openMap() {
    this.router.navigate(['home/stage/baseMap'], { skipLocationChange: true });
  }

  openUser() {
    //this.router.navigate(['home/navbar/openUser'], { skipLocationChange: true });
  }

  ngOnInit() {
    if (this.router.url === '/home/navbar/newStart') {
      this.newStartFunction();
    }

    this.apiService.getNavbarNumbers$().subscribe((next) => {
      setTimeout(() => {
        this.availablePackage = next[0];
        this.onhandCard = next[1];
        this.availableCard = next[2];
      }, 0);
    });
  }

  newStartFunction() {
    this.apiService.getStartANewGame$().subscribe((next) => {
      setTimeout(() => {
        this.router.navigate(['home/stage/newGame'], {
          skipLocationChange: true,
        });
      }, 0);
    });
  }
}
