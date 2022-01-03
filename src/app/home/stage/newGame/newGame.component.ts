import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { faGift, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newGame',
  templateUrl: './newGame.component.html',
  styleUrls: ['./newGame.component.scss'],
})
export class NewGameComponent implements OnInit {
  faPackage = faGift;
  faCard = faLayerGroup;
  enableButton = false;

  constructor(private apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.enableButton = true;
    }, 5000);
  }

  start(): void {
    this.apiService.changeGameStage$().subscribe((next) => {
      setTimeout(() => {
        if (next.stage.s_type === 10) {
          this.router.navigate([this.router.url]);
          this.router.navigate(['home/stage/baseMap'], {
            skipLocationChange: true,
          });
        }
      }, 0);
    });
  }
}
