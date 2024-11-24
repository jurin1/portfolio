import { Component } from '@angular/core';
import { PortfolioItemComponent } from './portfolio-item/portfolio-item.component';
import { CommonModule, NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    PortfolioItemComponent,
    NgFor,
    NgForOf,
    CommonModule,
    PortfolioItemComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  public projects = [
    {
      titel: 'Join',
      Languages: 'HTML | CSS | JavaScript',
      describtion:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      image: 'assets/img/portfolio/join.png',
      test: 'https://join.neizcon.de',
      github: 'https://github.com/jurin1/join',
    },
    {
      titel: 'El Pollo Locco',
      Languages: 'HTML | CSS | JavaScript',
      describtion:
        'A simple Jump-and-Run game based on an object-oriented approach. Help pepe to find coins and bottles to fight against the killer chicken.',
      image: 'assets/img/portfolio/locco.png',
      test: 'https://game.neizcon.de',
      github: 'https://github.com/jurin1/el_pollo_locco',
    },

  ];

  scrollbarWidth: number = 17;
  headlineGap: number = 42;

  constructor() {
    setInterval(() => this.changeLineWidth(), 1000);
  }

  changeLineWidth() {
    let headline: any = document.getElementById('headline');
    let lineWidth =
      window.innerWidth / 2 -
      headline?.clientWidth / 2 -
      this.scrollbarWidth -
      this.headlineGap;
    let rightLine: any = document.getElementById('rightLine');
    rightLine.style.width = `${lineWidth}px`;
  }
}
