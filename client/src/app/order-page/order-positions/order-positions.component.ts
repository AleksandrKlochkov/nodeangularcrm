import { Component, OnInit } from '@angular/core'
import { CategoriesService } from 'src/app/shared/servises/categories.service'
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from 'src/app/shared/servises/position.service'
import { Position } from '../../shared/interfaces'
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { MaterialServices } from 'src/app/shared/classes/material.services';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute, 
              private positionsService: PositionsService,
              private order: OrderService) { }

  ngOnInit() {
  this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map(
          (position: Position[]) => {
            return position.map(position => {
              position.quantity = 1
              return position
            })
          }
        )
      )
  }

  addToOrder(position: Position) {
    MaterialServices.toast(`Добавлено x${position.quantity}`)
    this.order.add(position)
  }

}
