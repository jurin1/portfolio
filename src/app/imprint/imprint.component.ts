import { Component } from '@angular/core';
import { TranslatePipe } from '../shared/pipes/translate.pipe';



@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [ TranslatePipe],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

}
