import {Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy} from 'angular2/core'
import {Control} from 'angular2/common'
import {Jsonp, JSONP_PROVIDERS, URLSearchParams} from "angular2/http";
import {Observable} from "rxjs/rx";


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [JSONP_PROVIDERS],
    pipes: [],
    directives: [],
    styles: [`
        .rd{color:red}
    `]
})
export class AppComponent implements OnInit {
    result = [];
    URL:string = 'http://en.wikipedia.org/w/api.php';

    constructor(private _jsonp:Jsonp, private el:ElementRef, private cdr:ChangeDetectorRef) {
    }

    ngOnInit() {
        Observable.fromEvent(this.el.nativeElement.querySelector('#aa'), 'keyup')
            .map((z:any)=>z.target.value)
            .filter(a=>a.length > 0)
            .debounceTime(250)
            .distinctUntilChanged()
            .switchMap((a:string)=>this.search(a))
            .map(data=> this.result = Object.keys(data).map(k=>data[k]))
            .subscribe(data => this.format(data))
    }

    format(data) {
        this.result = [];
        const page = 'http://en.wikipedia.org/?curid=';
        data.forEach((v)=> {
            if (!v.hasOwnProperty("thumbnail")) {
                this.result.push({
                    title: v.title, body: v.extract, page: page + v.pageid,
                    tnsrc: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/50px-Wikipedia-logo-v2.svg.png"
                })
            }
            else {
                this.result.push({title: v.title, body: v.extract, page: page + v.pageid, tnsrc: v.thumbnail.source})
            }
        });
        this.cdr.markForCheck()
    }

    search(q:string) {
        var search = new URLSearchParams();
        search.set('action', 'query');
        search.set('format', 'json');
        search.set('gsrnamespace', '0');
        search.set('generator', 'search');
        search.set('gsrlimit', '10');
        search.set('prop', 'pageimages|extracts');
        search.set('pilimit', 'max');
        search.set('exintro', '');
        search.set('explaintext', '');
        search.set('exsentences', '1');
        search.set('exlimit', 'max');
        search.set('gsrsearch', q);

        return this._jsonp
            .get(`${this.URL}?callback=JSONP_CALLBACK`, {search})
            .map((response) => response.json())
            .map(d=> (d.query && d.query.pages) ? d.query.pages : {});
    }

    static log(q) {
        console.log(q)
    }
}
