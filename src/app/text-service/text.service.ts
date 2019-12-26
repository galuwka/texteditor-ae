import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TextService {
  public style = new BehaviorSubject([]);
  public textSelected = new BehaviorSubject('');
  private SYNONIM_API = 'https://api.datamuse.com/words?rel_syn=';

  constructor(private http: HttpClient) {
  }

  getMockText() {
    return new Promise<string>(function (resolve) {
      resolve('A year ago I was in the audience at a gathering of designers in San Francisco. ' +
        'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
        'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
        'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
        'that modern design problems were very complex. And we ought to need a license to solve them.');
    });
  }

  getSynonymos(word: string) {
    return this.http.get(`${this.SYNONIM_API}${word}`)
  }

}
