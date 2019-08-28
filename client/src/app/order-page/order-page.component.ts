import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Navigation } from 'selenium-webdriver'
import { MaterialServices, MaterialInstance } from '../shared/classes/material.services'
import { OrderService } from './order.service'
import { OrderPosition, Order } from '../shared/interfaces'
import { OrdersService } from '../shared/servises/orders.service'
import { Subscription } from 'rxjs'

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
  oSub: Subscription
  pending = false

  constructor(private router: Router,
              private order: OrderService,
              private ordersService: OrdersService) { }

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

    if(this.oSub) {
      this.oSub.unsubscribe()
    }
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
    this.pending = true

    const order: Order = {
      list: this.order.list.map( item => {
        delete item._id
        return item
      })
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialServices.toast(`Заказ №${newOrder.order} был добавлен`)
        this.order.clear()
      },
      error => MaterialServices.toast(error.error.message),
        () => {
          this.modal.close()
          this.pending = false
        }
      
    )
  }

  removePosition(orderPosition: OrderPosition){
    this.order.remove(orderPosition)
  }

}
