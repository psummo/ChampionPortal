import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../models/team';
import {TeamService} from '../services/team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  id: number;
  teamSelected: Team;
  constructor(private root: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    try {
      this.root.paramMap.subscribe((param) => this.id = +param.get('id'));
      this.teamService.getTeamById(this.id).subscribe((response) => this.teamSelected = response);
    } catch (e) {
      console.log('indirizzo errato');
    }
  }
}
