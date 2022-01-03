import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { NewGameComponent } from './home/stage/newGame/newGame.component';
import { BaseMapComponent } from './home/stage/baseMap/baseMap.component';
import { OpenPackageComponent } from './home/navbar/openPackage/openPackage.component';
import { OpenCardsComponent } from './home/navbar/openCards/openCards.component';
import { OpenMapComponent } from './home/navbar/openMap/openMap.component';
import { ModalOpenPackageComponent } from './home/navbar/openPackage/modalOpenPackage/modalOpenPackage.component';
import { CardDisplayComponent } from './home/game/cardDisplay/cardDisplay.component';
import { CardDisplaySmallComponent } from './home/game/cardDisplay/cardDisplaySmall/cardDisplaySmall.component';
import { ModalCardWindowComponent } from './home/navbar/openCards/modalCardWindow/modalCardWindow.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    NavbarComponent,
    BaseMapComponent,
    OpenPackageComponent,
    OpenMapComponent,
    OpenCardsComponent,
    ModalOpenPackageComponent,
    CardDisplayComponent,
    CardDisplaySmallComponent,
    NewGameComponent,
    ModalCardWindowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
