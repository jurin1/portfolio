import { Component } from '@angular/core';
import { PortfolioItemComponent } from './portfolio-item/portfolio-item.component';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface Project {
  titel: string;
  Languages: string;
  describtion: { de: string; en: string };
  image: string;
  link: string;
  github: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    PortfolioItemComponent,
    NgFor,
    NgForOf,
    CommonModule,
    PortfolioItemComponent,
    TranslatePipe
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  // Typ für das "projects"-Array auf "Project[]" setzen
  public projects: Project[] = [
    {
      titel: 'Join',
      Languages: 'HTML | CSS | JavaScript',
      describtion: {
        de: 'Aufgabenmanager nach dem Vorbild des Kanban-Systems. Erstellen und organisieren Sie Aufgaben mit Hilfe von Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu.',
        en: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      },
      image: 'assets/img/portfolio/join.png',
      link: 'https://join.neizcon.de',
      github: 'https://github.com/jurin1/join',
    },
    {
      titel: 'El Pollo Locco',
      Languages: 'HTML | CSS | JavaScript',
      describtion: {
        de: 'Ein einfaches Jump-and-Run-Spiel, das auf einem objektorientierten Ansatz basiert. Hilf Pepe, Münzen und Flaschen zu finden, um gegen das Killerhuhn zu kämpfen.',
        en: 'A simple Jump-and-Run game based on an object-oriented approach. Help pepe to find coins and bottles to fight against the killer chicken.',
      },
      image: 'assets/img/portfolio/locco.png',
      link: 'https://game.neizcon.de',
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

  getDescription(description: any): string {
    const language = localStorage.getItem('language') || 'de';
    return description[language] || description['de'];
  }
}