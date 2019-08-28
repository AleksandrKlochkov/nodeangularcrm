import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core'
import { MaterialInstance, MaterialServices } from '../shared/classes/material.services'
import { OrdersService } from '../shared/servises/orders.service'
import { Subscription } from 'rxjs'
import { Order, Filter } from '../shared/interfaces'

const STEP = 5

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('tooltip', {static: true}) tooltipRef: ElementRef
  tooltip: MaterialInstance
  oSub: Subscription
  isFilterVisible = false 
  orders: Order[] = []
  offset = 0
  limit = STEP
  filter: Filter = {}

  loading = false
  reloading = false
  noMoreOrders = false

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({},this.filter, {
        offset: this.offset,
        limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe( orders => {
      this.orders = this.orders.concat(orders)
      this.noMoreOrders =  orders.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  } 

  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialServices.initTooltip(this.tooltipRef)
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

}
