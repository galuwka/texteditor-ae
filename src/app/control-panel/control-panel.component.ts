import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TextService, WordStyling} from '../text-service/text.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ControlPanelComponent {

  constructor(private textService: TextService) {
  }

  public isActive: { [key in WordStyling]: boolean } = {
    [WordStyling.bold]: false,
    [WordStyling.italic]: false,
    [WordStyling.underline]: false
  };

  public boldFormatter() {
    this.handlerFormatter(WordStyling.bold);
  }

  public italicFormatter() {
    this.handlerFormatter(WordStyling.italic);
  }

  public underlineFormatter() {
    this.handlerFormatter(WordStyling.underline);
  }

  private handlerFormatter(property: WordStyling) {
    this.isActive = {
      ...this.isActive,
      [property]: !this.isActive[property]
    };

    this.textService.style.next(
      (Object.keys(this.isActive) as WordStyling[])
        .filter((key) => {
          return this.isActive[key];
        })
    );
  }
}
