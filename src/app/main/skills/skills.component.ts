import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { options } from '../constant';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  public customOptions: OwlOptions = options;
}
