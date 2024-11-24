import { NgClass, NgFor, NgForOf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio.component';

@Component({
  selector: 'app-portfolio-item',
  standalone: true,
  imports: [NgFor, NgForOf, PortfolioComponent, NgClass],
  templateUrl: './portfolio-item.component.html',
  styleUrl: './portfolio-item.component.scss'
})
export class PortfolioItemComponent implements OnInit {

  @Input() index!:number;
  @Input() projects: any[] = [];

  constructor() {
    
  }

  ngOnInit(): void {

  }
}
