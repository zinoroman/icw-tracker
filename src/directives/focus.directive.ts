import { 
    Directive, 
    Input, 
    ElementRef, 
    Inject,
    SimpleChanges,
    AfterViewInit } from '@angular/core';

@Directive({
    selector: '[focus]'
}) 
export class FocusDirective implements AfterViewInit {
    @Input() focus: boolean;

    constructor(private element: ElementRef) {
    }

    public ngAfterViewInit() {
        const input: HTMLInputElement = this.element.nativeElement.querySelector('input');
        // we need to delay our call in order to work with ionic
        setTimeout(() => {
            if (focus) {
                input.focus();
            }
        }, 0);
    }
}