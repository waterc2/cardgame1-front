import { OpenMapComponent } from './home/navbar/openMap/openMap.component';
import { OpenCardsComponent } from './home/navbar/openCards/openCards.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';
import { OpenPackageComponent } from './home/navbar/openPackage/openPackage.component';
import { BaseMapComponent } from './home/stage/baseMap/baseMap.component';
import { NewGameComponent } from './home/stage/newGame/newGame.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FightComponent } from './home/stage/fight/fight.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home/stage/newGame',
    component: NewGameComponent,
    canActivate: [AuthService],
  },
  {
    path: 'home/stage/baseMap',
    component: BaseMapComponent,
    canActivate: [AuthService],
  },
  {
    path: 'home/stage/fight',
    component: FightComponent,
    canActivate: [AuthService],
  },
  {
    path: 'home/navbar/openPackage',
    component: OpenPackageComponent,
    canActivate: [AuthService],
  },
  {
    path: 'home/navbar/openCards',
    component: OpenCardsComponent,
    canActivate: [AuthService],
  },
  {
    path: 'home/navbar/openMap',
    component: OpenMapComponent,
    canActivate: [AuthService],
  },
  {
    path: 'home/navbar/loginOut',
    component: NavbarComponent,
    canActivate: [AuthService],
  },
  {
    path: 'home/navbar/newStart',
    component: NavbarComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
