import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { gameStage, baseMap, GlobalConstants } from 'src/app/share/models';
import { baseCardMode } from 'src/app/share/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as PIXI from 'pixi.js'

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {    
  public disableNavbar = true;
  public fightData = Array;
  @ViewChild("fightGrid") allCardDiv: ElementRef;
  
  renderer: PIXI.Application;
  fightBase: PIXI.Container;
  baseCardWidth = 120;
  closeResult = '';
  windowInnerWidth = Math.round(window.innerWidth * 0.99);
  windowInnerHeight = Math.round(window.innerHeight) - 66;

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {// Fetching
    this.apiService.getFight$().subscribe((next) => {
      setTimeout(() => {
        this.fightData = next['fight'];
        //console.log(this.fightData);
        this.drawBase();
      }, 0);
    });
  }

  drawBase(){
    this.renderer = new PIXI.Application({
       width: this.windowInnerWidth, height: this.windowInnerHeight, backgroundColor: 0xffffff,
       autoDensity: true,
       resolution: window.devicePixelRatio,
       backgroundAlpha: 0,
    });

    this.allCardDiv.nativeElement.appendChild(this.renderer.view);

  }

}
