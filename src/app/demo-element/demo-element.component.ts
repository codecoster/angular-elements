import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

declare const RSSParser;

@Component({
  selector: 'ks-demo-element',
  styleUrls: ['./demo-element.component.css'],
  template: `
    <h1 class="title">
      {{data?.title}}
    </h1>
    <ul class="tweet-list">
      <li class="tweet-list-element" *ngFor="let feed of data?.items">
        <a [href]="feed.link"> {{feed.title}}
          <small>{{feed.isoDate | date}}</small>
        </a>
      </li>
    </ul>
  `
})
export class DemoElementComponent implements OnInit {

  @Input() length = 4;

  @Input() set usecorsanywhere(useCors: string) {
    this.useCors = useCors ? useCors !== 'false' : true;
  }

  data: {
    title: string;
    feedUrl: string;
    items: Array<{
      categories: Array<string>;
      content: string;
      contentSnippet: string;
      isoDate: string;
      link: string;
      title: string
    }>
  };

  private useCors = true;

  constructor(private http: HttpClient, private app: ApplicationRef) {
  }

  ngOnInit() {
    const parser = new RSSParser();

    this.http.get(
      `${this.useCors ? 'https://cors-anywhere.herokuapp.com/' : ''}https://jaxenter.de/author/karstensitterberg/feed`,
      {responseType: 'text'}
    )
      .pipe(
        mergeMap(rss => parser.parseString(rss))
      )
      .subscribe((data: any) => {
        this.data = data;
        if (this.data.items && this.length) {
          this.data.items = this.data.items.slice(0, this.length);
        }
        this.app.tick();
      });

  }
}
