import { Injectable } from '@angular/core'
import { Position } from '../shared/interfaces'

@Injectable()
export class OrderService {
    add(position: Position) {
        console.log(1)
    }

    remove() {}

    clear() {}
}