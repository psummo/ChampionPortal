import { Component, OnInit } from '@angular/core';
import {MatchService} from '../services/match.service';
import {Match} from '../models/match';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matchList: Match[] = [];
  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.matchService.getMatchList().subscribe( (response) => {
        this.matchList = response;
      }, (error1 => {
        console.log("CIAO");
      })
    );
  }

}
