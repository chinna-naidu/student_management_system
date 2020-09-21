import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSubmit() {
    const val = this.myForm.value;
    this.authService.getSignup(val.name, val.email, val.password).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
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
