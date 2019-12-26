import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {TextService} from "../text-service/text.service";

enum wordStyling {
  bold = 'bold',
  italic = 'italic',
  underline = 'underline'
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ControlPanelComponent {

  constructor(private textService: TextService) {
  }

  public isActive = {
    bold: false,
    italic: false,
    underline: false
  };

  public cssClass: string;

  public boldFormatter() {
    this.handlerFormatter(wordStyling.bold, "bold");
  }

  public italicFormatter() {
    this.handlerFormatter(wordStyling.italic, "italic");
  }

  public underlineFormatter() {
    this.handlerFormatter(wordStyling.underline, "underline");
  }

  private handlerFormatter(property: string, style: string) {
    if (!this.isActive[style]) {
      this.textService.style.next([...this.textService.style.getValue(), property]);
    } else {
      this.textService.style.getValue().splice(this.textService.style.getValue().indexOf(property), 1);
      this.textService.style.next([...this.textService.style.getValue()]);
    }
    this.cssClass = this.textService.style.getValue().join(" ");
    this.isActive[style] = !this.isActive[style];
  }
}
