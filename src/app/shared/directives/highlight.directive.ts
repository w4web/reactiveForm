import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  @Input() tagBgColor!: string;

  constructor( private el: ElementRef ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.tagBgColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
