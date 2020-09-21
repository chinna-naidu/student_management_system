import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../modals/user.modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);
  constructor(private httpService: HttpService, private router: Router) {}

  getLogin(email: string, password: string) {
    return this.httpService.login(email, password);
  }

  getSignup(name: string, email: string, password: string) {
    return this.httpService.signup(name, email, password);
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.user.next(userData);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/login']);
  }
}
