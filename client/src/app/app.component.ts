import { Component, OnInit } from '@angular/core';
import { AuthServices } from './shared/servises/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{
  constructor(private auth: AuthServices) {
  }

  ngOnInit(){
    const potentialToken = localStorage.getItem('auth-token')
    if(potentialToken !== null) {
        this.auth.setToken(potentialToken)
    }
  }
}
