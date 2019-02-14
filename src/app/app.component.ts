import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Match} from './models/match';
import {NavigationStart, Router} from '@angular/router';

export let browserRefresh = false;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  matchesList: Match[] = [];

  ngOnInit(): void {
  }
}
