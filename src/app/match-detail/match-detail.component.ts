import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../services/team.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  idTeam: number
  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(paramMap => {
        this.idTeam = +paramMap.get('id');
      });
    if (TeamService.teamCache.length !== 0) {
        //TODO EFFETTUA LA RICHIESTA
    } else {
      //TODO VERIFICA CHE CI SONO TUTTI I DATI DEL TEAM

    }
  }

}
