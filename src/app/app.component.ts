import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cardgame1';
  constructor(
    
    private translateService: TranslateService,
    ) {
        this.translateService.addLangs(['zh']);
        this.translateService.setDefaultLang('zh');
        this.translateService.use('zh');
    }
}
