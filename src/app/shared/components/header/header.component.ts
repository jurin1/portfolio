import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TranslationService } from '../../../translation.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuButtonImg = [
    'assets/img/header/burger.png',
    'assets/img/header/Transition.png',
    'assets/img/header/close_medium.png',
    'assets/img/header/close.png',
  ];

  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('menuDialog') menuDialog!: ElementRef;

  menuOpen: boolean = false;
  currentImage: number = 0;

  public aboutMe: boolean = false;
  public skills: boolean = false;
  public portfolio: boolean = false;

  public selectedItem: string | null = null;

  public buttonText: string = 'DE'; // Standardtext des Buttons

  constructor(private renderer: Renderer2, private translationService: TranslationService) {
    // Initialisiere den Buttontext basierend auf der aktuellen Sprache
    const currentLang = this.translationService.getCurrentLang();
    this.buttonText = currentLang === 'en' ? 'DE' : 'EN';
  }

  // Sprache wechseln und Buttontext aktualisieren
  public switchLanguage(): void {
    const newLang = this.translationService.getCurrentLang() === 'en' ? 'de' : 'en';
    this.translationService.setLanguage(newLang);
    this.buttonText = newLang === 'en' ? 'DE' : 'EN';
  }

  public selectItem(item: string): void {
    this.portfolio = false;
    this.skills = false;
    this.aboutMe = false;
    (this as any)[item] = true;
    this.selectedItem = item;
  }

  public resetSelected() {
    this.aboutMe = false;
    this.portfolio = false;
    this.skills = false;
    this.selectedItem = null;
  }

  openMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      this.startImgAnimationOpen();
      this.toggleMenuClasses('flex');
    } else {
      this.startImgAnimationClose();
      this.toggleMenuClasses('none');
    }
  }

private toggleMenuClasses(displayValue: string): void {
  this.renderer.setStyle(this.menuDialog.nativeElement, 'display', displayValue);
}

  startImgAnimationOpen() {
    let interval = setInterval(() => {
      if (this.currentImage < this.menuButtonImg.length - 1) {
        this.currentImage = (this.currentImage + 1) % this.menuButtonImg.length;
        const newImagePath = this.menuButtonImg[this.currentImage];
        this.renderer.setAttribute(this.menuButton.nativeElement, 'src', newImagePath);
      } else {
        clearInterval(interval);
      }
    }, 80);
  }

  startImgAnimationClose() {
    let interval = setInterval(() => {
      if (this.currentImage > 0) {
        this.currentImage = (this.currentImage - 1) % this.menuButtonImg.length;
        const newImagePath = this.menuButtonImg[this.currentImage];
        this.renderer.setAttribute(this.menuButton.nativeElement, 'src', newImagePath);
      } else {
        clearInterval(interval);
      }
    }, 80);
  }
}
