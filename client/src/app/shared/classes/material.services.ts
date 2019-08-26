import { ElementRef } from '@angular/core';

declare var M


export class MaterialServices {
    static toast(message: string) {
        M.toast({html: message})
    }

    static initializeFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement)
    }
}