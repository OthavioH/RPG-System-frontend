import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { RitualElement } from 'src/models/Ritual';

@Component({
  selector: 'app-create-ritual-dialog',
  templateUrl: './create-ritual-dialog.component.html',
  styleUrls: ['./create-ritual-dialog.component.scss']
})
export class CreateRitualDialogComponent implements OnInit {

  selectedElements:RitualElement[] = [];

  constructor(public dialogRef: MatDialogRef<CreateRitualDialogComponent>,private gameSettingsService: GameSettingsService) { }

  ngOnInit(): void {
  }

  onElementSelected(selectedElement:string): void {
    if (this.selectedElements.find(element => element === selectedElement) != null) {
      this.selectedElements = this.selectedElements.filter(element => element != selectedElement);
    }
    else {
      var newElement:RitualElement = this.getRitualElement(selectedElement);
      this.selectedElements.push(newElement);
    }
  }

  getRitualElement(element:string):RitualElement {
    switch (element) {
      case 'energia':
        return RitualElement.energy;
      case 'morte':
        return RitualElement.death;
      case 'medo':
        return RitualElement.fear;
      case 'sangue':
        return RitualElement.blood;
      case 'conhecimento':
        return RitualElement.knowledge;
      default:
        return RitualElement.unknown;
    }
  }

  createNewRitual(name: string,circle: string,execution: string,range: string,target: string,duration: string,description: string): void {
    this.gameSettingsService.createNewRitual(name,circle,execution,range,target,duration,description,this.selectedElements);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
