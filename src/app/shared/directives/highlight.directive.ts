import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  @Input() tagBgColor!: string;

  constructor( private el: ElementRef ) { }

  // Host binding example

  @HostBinding('style.backgroundColor') tagBgColor2: any;
  @HostBinding('class.myClass') className!: boolean;
  @HostBinding('attr.title') myTitle: any;

  @HostListener('click') myClick() {
    this.tagBgColor2 = 'blue';
    this.className = true;
    this.myTitle = 'Title test..';
  }

  // ---------------

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
