import { Component } from '@angular/core';
import {Match} from './models/match';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  matchesList: Match[] = [];
}
