import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { isNull } from 'util';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSignupButtonClicked(email: string, password: string) {
    if (
      email === '' ||
      email === undefined ||
      password === '' ||
      password === undefined
    ) {
      alert('Username or password cannot be blank!');
    } else if (!this.isEmail(email)) {
      alert('Invalid email address!\nPlease input email as \'example@box.com\'');
    } else if (!this.isPasswordStrong(password)) {
      alert('Password should be at least 8 digits and contain letters, numbers and symbols');
    } else {
      this.authService
        .signup(email, password)
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.router.navigate(['/lists']);
        });
    }
  }

  isEmail(str) {
    const myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if (myReg.test(str)) {
      return true;
    }
    return false;
  }

  isPasswordStrong(pwd) {
    if (
      pwd.match('^.*[a-zA-Z]+.*$') &&
      pwd.match('^.*[0-9]+.*$') && // contain numbers, letters and symbols
      pwd.match('^.{8,}$') && // at least 8 digits
      !pwd.match('^.*[\\s]+.*$') // cannot contain whitespace characters
    ) {
      return true;
    } else {
      return false;
    }
  }
}
