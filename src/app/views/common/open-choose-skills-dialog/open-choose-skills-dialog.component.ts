import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISkill } from 'src/model/Skill';

@Component({
  selector: 'app-open-choose-skills-dialog',
  templateUrl: './open-choose-skills-dialog.component.html',
  styleUrls: ['./open-choose-skills-dialog.component.scss']
})
export class OpenChooseSkillsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpenChooseSkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISkill[],) { }

  ngOnInit(): void {
  }

}
