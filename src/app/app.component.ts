import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { throttleTime} from 'rxjs/operators';
import { ScrollSpyService } from 'ng-spy';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  public fixedHeader: boolean = false;
  private windowScroll$: Subscription = Subscription.EMPTY;
  currentLang: string = 'en';
  constructor(private spyService: ScrollSpyService, private translate: TranslateService, private router: Router ) { }
  
  
  
  ngOnInit() {
    this.windowScroll$ = fromEvent(window, 'scroll')
      .pipe(throttleTime(30))
      .subscribe(() => this.onScroll());
    
        this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0); 
    });
    
    const storedLang = localStorage.getItem('language');
    
    if (storedLang) {
      this.translate.use(storedLang);
      this.currentLang = storedLang;
    } else {
      const browserLang = navigator.language.split('-')[0]; 
      if (browserLang && ['de', 'en'].includes(browserLang)) {
        this.translate.use(browserLang);
        this.currentLang = browserLang;
      } else {
        this.translate.use('de');
        this.currentLang = 'de';
      }
    }

  }


  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;


    localStorage.setItem('language', lang);
  }

  ngAfterViewInit() {
    this.spyService.spy({ thresholdBottom: 50 });
  }

  ngOnDestroy() {
    this.windowScroll$.unsubscribe();
  }
  
  onScroll(){
    //code to fix header on scroll
    if (document.documentElement.scrollTop >= 100 || document.body.scrollTop >= 100) {
      this.fixedHeader = true;
    } else {
      this.fixedHeader = false;
    }
  }
}
