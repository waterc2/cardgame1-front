import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, CanActivate, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/logout') {
          this.logout();
        }
      }
    });
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
  get form() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.authService
      .loginUser(this.form.email.value, this.form.password.value)
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.user.u_id) {
            this.router.navigate(['']);
          }
        },
        (error: any) => {
          console.log(111, error);
        }
      );
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }
}
