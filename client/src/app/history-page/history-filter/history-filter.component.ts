import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core'
import { Filter } from '../../shared/interfaces'
import { MaterialServices, MaterialDatepicker } from 'src/app/shared/classes/material.services'

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start', {static: false})  startRef: ElementRef
  @ViewChild('end', {static: false})  endRef: ElementRef


  start: MaterialDatepicker
  end: MaterialDatepicker
  order: number

  isValid = true

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.start.destroy()
    this.end.destroy()
  }

  ngAfterViewInit() {
    this.start =  MaterialServices.initDatepicker(this. startRef, this.validate.bind(this))
    this.end =  MaterialServices.initDatepicker(this. endRef, this.validate.bind(this))
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }

    this.isValid = this.start.date < this.end.date

  }

  submitFilter() {
    const filter: Filter = {}

    if(this.order) {
      filter.order = this.order
    }

    if(this.start.date){
      filter.start = this.start.date
    }

    if(this.end.date) {
      filter.end = this.end.date
    }

    this.onFilter.emit(filter)
  }

}
