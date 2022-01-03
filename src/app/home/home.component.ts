import { map } from 'rxjs/operators';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gameStage, baseMap, GlobalConstants } from 'src/app/share/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public stage: gameStage;
  public showButtons: Array<number>;
  public currentMap: baseMap;
  public background: string;

  constructor(private apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    // Fetching
    this.apiService.getStage$().subscribe((next) => {
      setTimeout(() => {
        this.stage = next.stage;
        console.log(this.stage);
        if (this.stage.f_id !== 0) {
          //load fight
        } else if (this.stage.d_id !== 0) {
          //load dungeon
        } else {
          //load map
          this.apiService.getMapData$().subscribe((next) => {
            setTimeout(() => {
              this.currentMap = next.map;
            }, 0);
          });
        }
        //this.changeStageByType(this.stage);
      }, 0);
    });
  }

  changeStageByType(s_type: any) {
    console.log(s_type);
    switch (s_type) {
      case 1: //start a new game
        console.log('go to 1');
        this.router.navigate(['home/stage/newGame'], {
          skipLocationChange: true,
        });
        break;
      case 10: //start a new game
        console.log('go to 10');
        this.router.navigate(['home/stage/baseMap'], {
          skipLocationChange: true,
        });
        break;
    }
  }
}
