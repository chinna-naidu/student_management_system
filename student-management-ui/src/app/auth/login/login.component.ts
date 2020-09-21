import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { User } from 'src/app/modals/user.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  isLoading = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSubmit() {
    const val = this.myForm.value;
    this.isLoading = true;
    this.authService.getLogin(val.email, val.password).subscribe(
      (data: User) => {
        console.log(data);
        this.isLoading = false;
        this.authService.user.next(data);
        this.router.navigate(['/home']);
        localStorage.setItem('user', JSON.stringify(data));
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  hasError(control: string) {
    if (!this.myForm.get(control).valid && this.myForm.get(control).touched) {
      return true;
    } else {
      return false;
    }
  }
}
