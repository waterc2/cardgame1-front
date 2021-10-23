import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public stage: string;
  public showButtons : Array<number>;

  constructor(
    private apiService: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Fetching
    this.apiService.getStage$()
      .subscribe((next) => {
        setTimeout(() => {
          this.stage = next.stage.s_type;
          this.changeStageByType(this.stage);
        }, 0);
      }
      );
  }
  
  changeStageByType(s_type: any)
  {
    switch(s_type){
      case 1://start a new game
      console.log('go to 1');
      this.router.navigate(["home/stage/newGame"], { skipLocationChange: true });
      break;
      case 10://start a new game
      console.log('go to 10');
      this.router.navigate(['home/stage/baseMap'], { skipLocationChange: true });
      break;      
    }
  }

}
