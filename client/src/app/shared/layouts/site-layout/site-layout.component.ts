import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { AuthServices } from '../../servises/auth.service';
import { Router } from '@angular/router';
import { MaterialServices } from '../../classes/material.services';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating', {static: false}) floatingRef: ElementRef

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'}
  ]

  constructor(private auth: AuthServices,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
      MaterialServices.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
