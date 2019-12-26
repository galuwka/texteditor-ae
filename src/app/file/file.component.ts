import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {TextService} from '../text-service/text.service';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit, OnDestroy {
  text$: Promise<string>;
  style: Observable<string[]>;
  synonym: Observable<any>;
  subscriber: Subscription;
  text: string;
  replace = '';

  constructor(private textService: TextService) {

  }

  ngOnInit() {
    this.subscriber = this.textService.textSelected.subscribe((item) => {
      this.synonym = this.textService.getSynonymos(item);
    });
    this.text$ = this.textService.getMockText();
    this.style = this.textService.style.asObservable();

  }

  onChange($event) {
    if ($event.target.value) {
      this.replace = $event.target.value;
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
