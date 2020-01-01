import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Synonym, TextService} from '../text-service/text.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  text$: Observable<string>;
  style: Observable<string[]>;
  synonym: Observable<Synonym[]>;
  text: string;
  replace = '';

  constructor(private textService: TextService) {

  }

  ngOnInit() {
    this.synonym = this.textService.getSynonymos();
    this.text$ = this.textService.getMockText();
    this.style = this.textService.style.asObservable();
  }

  onChange($event: Event & { target: HTMLOptionElement }) {
    if ($event.target.value) {
      this.replace = $event.target.value;
    }
  }

  trackByFn(index: number, {word}: Synonym) {
    return word;
  }
}
