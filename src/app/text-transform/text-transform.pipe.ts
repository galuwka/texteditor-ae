import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {


  constructor(private _domSanitizer: DomSanitizer) {
  }

  transform(value: any, style: any, replace?: any): any {
    return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value, style, replace));
  }

  private stylize(text: string, style: any, replace?: any): string {
    let stylizedText: string = '';
    const selection = window.getSelection();
    if (text && text.length > 0 && !!style) {
      if (selection.type === 'Range') {
        const {startOffset, endOffset} = selection.getRangeAt(0);
        let start = text.substring(0, startOffset);
        let searchString = text.substring(startOffset, endOffset);
        let end = text.substring(endOffset, text.length);
        searchString = `<span style="${style.join(';')}">${replace ? replace : searchString}</span>`;
        stylizedText = start + searchString + end;
        return stylizedText;
      } else return text;
    } else return text;
  }

}
