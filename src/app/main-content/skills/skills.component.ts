import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
