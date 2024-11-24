import { NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuButtonImg = ['assets/img/header/burger.png', 'assets/img/header/Transition.png', 'assets/img/header/close_medium.png', 'assets/img/header/CLOSE_FINAL.png']

  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('menuDialog') menuDialog!: ElementRef;

  menuOpen: boolean = false;
  currentImage: number = 0;

  public aboutMe: boolean = false;
  public skills: boolean = false;
  public portfolio: boolean = false;

  public selectedItem: string | null = null;

  constructor(private renderer: Renderer2) { }

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
    if (!this.menuOpen) {
      this.menuOpen = true;      
      this.startImgAnimationOpen();
      this.renderer.removeClass(this.menuDialog.nativeElement, 'hide-menu');
      this.renderer.addClass(this.menuDialog.nativeElement, 'show-menu');
    }else if (this.menuOpen) {
      this.menuOpen = false;
      this.startImgAnimationClose();
      this.renderer.removeClass(this.menuDialog.nativeElement, 'show-menu');
      this.renderer.addClass(this.menuDialog.nativeElement, 'hide-menu');
    }
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
        this.currentImage = (this.currentImage - 1) % this.menuButtonImg.length;;
        const newImagePath = this.menuButtonImg[this.currentImage];
        this.renderer.setAttribute(this.menuButton.nativeElement, 'src', newImagePath);
      } else {
        clearInterval(interval);
      }
    }, 80);
  }
}