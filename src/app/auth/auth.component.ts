import { Component, OnInit } from '@angular/core';
import {AuthHeaderValues, AuthService, UserBody} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin = true
  authHeaderValues: AuthHeaderValues = {
    username: ''
  }
  newUserBody: UserBody = {
    name: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submitLogin(): void {
    this.authService.getLogin(this.authHeaderValues)
      .subscribe((err) => {
        if (err){
          alert(err)
        } else {
          this.router.navigate(['triplist'])
        }
      })
  }

  submitSignup(): void {
    this.authService.postSignup(this.newUserBody)
      .subscribe((res) => {
        alert(res.message)
        this.toggleIsLogin()
      })
  }

  toggleIsLogin(): void {
    this.isLogin = !this.isLogin
  }
}


