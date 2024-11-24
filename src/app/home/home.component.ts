import { Component } from '@angular/core';
import { HeroSectionComponent } from '../main-content/hero-section/hero-section.component';
import { AboutMeComponent } from '../main-content/about-me/about-me.component';
import { PortfolioComponent } from '../main-content/portfolio/portfolio.component';
import { SkillsComponent } from '../main-content/skills/skills.component';
import { ContactComponent } from '../main-content/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutMeComponent,
    PortfolioComponent,
    SkillsComponent,
    ContactComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
