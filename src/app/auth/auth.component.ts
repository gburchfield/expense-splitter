import { Component, OnInit } from '@angular/core';
import {AuthHeaderValues, AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authHeaderValues: AuthHeaderValues = {
    username: ''
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
}


