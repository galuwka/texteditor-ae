import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {TextService} from "../text-service/text.service";

@Directive({
  selector: '[appTextEdit]',
})
export class TextEditDirective implements OnChanges {

  constructor(private elem: ElementRef, private renderer: Renderer2, private textService: TextService) {
  }

  @Input() classCSS: string;
  @Input() wordReplace: string;

  private style: string[];

  private searchString = '';
  private range: Range;
  private wrapper: HTMLSpanElement;

  @HostListener('mouseup', ['$event'])
  select(event) {
    if (event.view.getSelection().type === "Range") {
      const selection = event.view.getSelection();
      this.range = selection.getRangeAt(0);
      this.searchString = selection.getRangeAt(0).cloneContents().textContent;
      this.textFormatter();
      this.textService.textSelected.next(this.searchString);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.classCSS) {
      this.style = changes.classCSS.currentValue;
      this.applyStyle();
    }
    if (changes.wordReplace) {
      this.searchString = changes.wordReplace.currentValue;
      this.textFormatter()
    }
  }

  private textFormatter() {
    if (!!this.range) {

      //somehow need to track if wrapper is span or not?
      this.wrapper = this.renderer.createElement('span');
      this.renderer.setProperty( this.wrapper , 'innerText', this.searchString);
      this.applyStyle();
      this.range.deleteContents();
      this.range.insertNode(this.wrapper);
    }
  }

  private applyStyle() {
    if (!!this.wrapper) {
      this.renderer.setAttribute(this.wrapper, 'class', `${this.style.join(' ')}`);
    }
}

}
