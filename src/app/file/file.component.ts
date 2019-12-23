import {ChangeDetectionStrategy, Component, OnInit, HostListener, OnDestroy} from '@angular/core';
import {TextService} from '../text-service/text.service';
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit, OnDestroy {
  text$: Promise<string>;
  word: string;
  textSelected = new BehaviorSubject('');
  style: any;
  synonym: any;
  subscriber: Subscription;
  subscriber1: Subscription;
  selection: any;
  text: string;
  replace = '';

  constructor(private textService: TextService) {

  }

  ngOnInit() {
    this.subscriber = this.textSelected.subscribe((item) => {
      this.synonym = this.textService.getSynonymos(item);
    });
    this.text$ = this.textService.getMockText();
    this.textService.getMockText().then(value => {
      this.text = value;
    });

    this.subscriber1 = this.textService.style.subscribe((value => {
        this.style = value;
      })
    )

  }

  @HostListener('dblclick', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('document:click', ['$event'])
  selectText(event) {
    if (event.view.getSelection().type === "Range") {
      this.selection = event.view.getSelection();
      this.textSelected.next(this.text.substring(this.selection.anchorOffset, this.selection.focusOffset))
    }
  }

  onChange($event) {
    if ($event.target.value) {
      this.replace = $event.target.value;
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    this.subscriber1.unsubscribe();
  }
}
