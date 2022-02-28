import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faMapMarked,
  faGift,
  faLayerGroup,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/service/api.service';

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
  public availablePackage: number;
  public onhandCard: number;
  public availableCard: number;

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
    this.router.navigate(['home/navbar/openMap'], { skipLocationChange: true });
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
