import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router';
import { Navigation } from 'selenium-webdriver';
import { MaterialServices, MaterialInstance } from '../shared/classes/material.services';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('modal', {static: false}) modalRef: ElementRef
  modal: MaterialInstance
  isRoot: boolean

  constructor(private router: Router,
              private order: OrderService) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }
  
  ngAfterViewInit() {
    this.modal = MaterialServices.initModal(this.modalRef)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.modal.close()
  }

}
