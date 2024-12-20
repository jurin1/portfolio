import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { options2 } from '../constant';

@Component({
  selector: 'app-skillsBar',
  templateUrl: './skillsBar.component.html',
  styleUrls: ['./skillsBar.component.scss']
})
export class skillsBarComponent {
  public slidesStore!: any[];
  public customOptions2: OwlOptions = options2;
  ngOnInit(): void {
    this.slidesStore = [
      {
        id : 1,
        src: "assets/img/skills/html.png",
        alt: "html",
        title: "html",
      },
      {
        id : 2,
        src: "assets/img/skills/css.png",
        alt: "css",
        title: "css",
      },
      {
        id : 3,
        src: "assets/img/skills/js.png",
        alt: "js",
        title: "javascript",
      },
      {
        id : 4,
        src: "assets/img/skills/ts.png",
        alt: "ts",
        title: "typscript",
      },
      {
        id : 5,
        src: "assets/img/skills/angular.png",
        alt: "angular",
        title: "angular",
      },      {
        id : 6,
        src: "assets/img/skills/firebase.png",
        alt: "firebase",
        title: "firebase",
      },      {
        id : 7,
        src: "assets/img/skills/git.png",
        alt: "git",
        title: "git",
      },      {
        id : 8,
        src: "assets/img/skills/api.png",
        alt: "api",
        title: "api",
      },      {
        id : 9,
        src: "assets/img/skills/scrum.png",
        alt: "scrum",
        title: "scrum",
      },      {
        id : 10,
        src: "assets/img/skills/design.png",
        alt: "design",
        title: "design",
      },      {
        id : 11,
        src: "assets/img/skills/learning.png",
        alt: "learning",
        title: "learning",
      },
    ];
  }
}
