import { Component } from '@angular/core';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faPlus = faPlus;
  faList = faList;
}
