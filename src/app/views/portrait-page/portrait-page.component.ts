import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters/shared/services/characters.service';
import { ICharacter } from '../../../models/Character';
import { findCharacterIndex } from '../common/view_utils';
import { WebSocketService } from '../shared/web-socket.service';

@Component({
  selector: 'app-portrait-page',
  templateUrl: './portrait-page.component.html',
  styleUrls: ['./portrait-page.component.scss']
})
export class PortraitPageComponent implements OnInit {

  charactersList: ICharacter[] = [];

  constructor(
    private charactersService:CharactersService,
    private socketService: WebSocketService,
  ) {}

  ngOnInit(): void {
    this.subscribeCharacterList();
  }

  async subscribeCharacterList() {
    this.charactersList = await this.charactersService.getCharacters();
    this.socketService.listen('characterChanged').subscribe((character) =>{
      console.log(character);

      if (character != null) {
        const index = findCharacterIndex(this.charactersList, character);
        if (index > -1) {

          this.charactersList[index] = character;
        }
      }
    });

    this.socketService.listen('newCharacterList').subscribe((characterList) =>{
      if (characterList != null) {
        this.charactersList = characterList;
      }
    });
  }

}
