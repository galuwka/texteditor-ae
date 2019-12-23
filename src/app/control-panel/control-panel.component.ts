import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
} from '@angular/core';
import {TextService} from "../text-service/text.service";

enum wordStyling {
  bold = 'font-weight: bold',
  italic = 'font-style: italic',
  underline = 'text-decoration: underline'
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ControlPanelComponent {

  constructor(private render: Renderer2, private textService: TextService) {
  }

  isActive = {
    bold: false,
    italic: false,
    underline: false
  };


  public boldFormatter() {
    this.handlerFormatter(wordStyling.bold, "bold");
  }

  public italicFormatter() {
    this.handlerFormatter(wordStyling.italic, "italic");
  }

  public underlineFormatter() {
    this.handlerFormatter(wordStyling.underline, "underline");
  }

  handlerFormatter(property: string, style: string) {
    if (!this.isActive[style]) {
      this.textService.style.next([...this.textService.style.getValue(), property]);
    } else {
      this.textService.style.getValue().splice(this.textService.style.getValue().indexOf(property), 1)
    }

    this.isActive[style] = !this.isActive[style];
  }
}
