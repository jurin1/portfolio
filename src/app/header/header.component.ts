import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentLang: string = 'en';
  public sidebarOpen: boolean = false;
  public currentSection = 'home';
  
  constructor(private translate: TranslateService) {}

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;

    // Speichere die gewählte Sprache im localStorage
    localStorage.setItem('language', lang);
  }

  fullPageScroll(i:any) {
    if(this.sidebarOpen)
      this.sidebarOpen = false;
  }

  toggleMenu(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  onClickedOutside(e: Event) {
    if(this.sidebarOpen)
      this.sidebarOpen = false;
  }

}
