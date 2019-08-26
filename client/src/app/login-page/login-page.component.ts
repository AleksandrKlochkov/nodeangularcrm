import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { AuthServices } from '../shared/servises/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialServices } from '../shared/classes/material.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthServices, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']){
        MaterialServices.toast('Теперь вы можите зайти в систему используя свои данные')
      }else if(params['accessDenied']) {
        MaterialServices.toast('Для начала авторизуйтесь в системе')
      }else if(params['sesionFailed']){
        MaterialServices.toast('Пожалуйста войдите в систему заного')
      }
    })
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialServices.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
