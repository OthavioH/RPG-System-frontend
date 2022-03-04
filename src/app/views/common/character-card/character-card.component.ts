import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ICharacter } from 'src/models/Character';
import { DeleteCharacterDialogComponent } from '../delete-character-dialog/delete-character-dialog.component';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input()
  character:ICharacter;

  constructor(private modalService:MatDialog,private sanitizer:DomSanitizer) {
  }

  ngOnInit(): void {
  }

  openDeleteCharacterDialog(id:number):void{
    this.modalService.open(DeleteCharacterDialogComponent, {data:id})
  }

}
