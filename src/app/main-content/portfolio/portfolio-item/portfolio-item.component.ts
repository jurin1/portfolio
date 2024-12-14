import { NgClass, NgFor, NgForOf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-portfolio-item',
  standalone: true,
  imports: [NgFor, NgForOf, PortfolioComponent, NgClass,TranslatePipe],
  templateUrl: './portfolio-item.component.html',
  styleUrl: './portfolio-item.component.scss'
})
export class PortfolioItemComponent implements OnInit {

  @Input() index!: number;
  @Input() projects: any[] = [];
  language: string = 'de';

  constructor() {}

  ngOnInit(): void {
    this.language = localStorage.getItem('language') || 'de';
  }

getDescription(description: { de: string; en: string }): string {
  const language: 'de' | 'en' = (localStorage.getItem('language') as 'de' | 'en') || 'en';
  return description[language];
}
}