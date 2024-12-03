import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
