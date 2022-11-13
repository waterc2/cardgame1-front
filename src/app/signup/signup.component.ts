import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private formbuilder: UntypedFormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      u_email: [null, [Validators.required, Validators.email]],
      u_password: [null, Validators.required],
    });
  }

  submit(): void {
    this.http
      .post('http://127.0.0.1/api/auth/register', this.form.getRawValue())
      .subscribe((res) => {
        this.router.navigate(['login']);
      },
      (error: any) => {
      //console.log(error);
        this.toastr.error(error.error);
      });
  }
}
