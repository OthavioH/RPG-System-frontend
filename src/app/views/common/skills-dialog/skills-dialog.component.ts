import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ISkill } from 'src/model/Skill';

@Component({
  selector: 'app-skills-dialog',
  templateUrl: './skills-dialog.component.html',
  styleUrls: ['./skills-dialog.component.scss']
})
export class SkillsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public skill: ISkill,) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
