import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../models/team';
import {TeamService} from '../services/team.service';
import {Player} from '../models/player';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  id: number;
  teamSelected: Team;
  coachTeam: string;
  mapRole = new Map<string, Player[]>();
  loader = true;
  constructor(private root: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {

      this.root.paramMap.subscribe((param) => this.id = +param.get('id'));
      this.teamService.getTeamById(this.id).pipe(finalize(() => {
        this.loader = false;
      })).subscribe((response) => {
        console.log(response);
        this.teamSelected = response;
        this.dividePerRole();
      });

  }
  dividePerRole() {
    for (const player of this.teamSelected.squad) {
      if (this.mapRole.get(player.position)) {
        this.mapRole.get(player.position).push(player);
      } else {
        const tmpArray: Player[] = [];
        tmpArray.push(player);
        this.mapRole.set(player.position, tmpArray);
      }
    }
    for (const coach of this.teamSelected.squad) {
      if (coach.role === 'COACH') {
        this.coachTeam = coach.name;
        return;
      }

    }
  }
}
