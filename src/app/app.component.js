System.register(['angular2/core', "angular2/http", "rxjs/rx"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, rx_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (rx_1_1) {
                rx_1 = rx_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_jsonp, el, cdr) {
                    this._jsonp = _jsonp;
                    this.el = el;
                    this.cdr = cdr;
                    this.result = [];
                    this.URL = 'http://en.wikipedia.org/w/api.php';
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    rx_1.Observable.fromEvent(this.el.nativeElement.querySelector('#aa'), 'keyup')
                        .map(function (z) { return z.target.value; })
                        .filter(function (a) { return a.length > 0; })
                        .debounceTime(250)
                        .distinctUntilChanged()
                        .switchMap(function (a) { return _this.search(a); })
                        .map(function (data) { return _this.result = Object.keys(data).map(function (k) { return data[k]; }); })
                        .subscribe(function (data) { return _this.format(data); });
                };
                AppComponent.prototype.format = function (data) {
                    var _this = this;
                    this.result = [];
                    var page = 'http://en.wikipedia.org/?curid=';
                    data.forEach(function (v) {
                        if (!v.hasOwnProperty("thumbnail")) {
                            _this.result.push({
                                title: v.title, body: v.extract, page: page + v.pageid,
                                tnsrc: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/50px-Wikipedia-logo-v2.svg.png"
                            });
                        }
                        else {
                            _this.result.push({ title: v.title, body: v.extract, page: page + v.pageid, tnsrc: v.thumbnail.source });
                        }
                    });
                    this.cdr.markForCheck();
                };
                AppComponent.prototype.search = function (q) {
                    var search = new http_1.URLSearchParams();
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
                        .get(this.URL + "?callback=JSONP_CALLBACK", { search: search })
                        .map(function (response) { return response.json(); })
                        .map(function (d) { return (d.query && d.query.pages) ? d.query.pages : {}; });
                };
                AppComponent.log = function (q) {
                    console.log(q);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        providers: [http_1.JSONP_PROVIDERS],
                        pipes: [],
                        directives: [],
                        styles: ["\n        .rd{color:red}\n    "]
                    }), 
                    __metadata('design:paramtypes', [http_1.Jsonp, core_1.ElementRef, core_1.ChangeDetectorRef])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map