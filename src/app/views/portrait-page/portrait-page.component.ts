import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters/shared/services/characters.service';
import { ICharacter } from '../../../models/Character';
import { findCharacterIndex } from '../common/view_utils';

@Component({
  selector: 'app-portrait-page',
  templateUrl: './portrait-page.component.html',
  styleUrls: ['./portrait-page.component.scss']
})
export class PortraitPageComponent implements OnInit {

  charactersList: ICharacter[] = [];

  constructor(
    private charactersService:CharactersService,
  ) {}

  ngOnInit(): void {
    this.subscribeCharacterList();
    this.charactersService.getCharacters();
  }

  subscribeCharacterList() {
    this.charactersService.onCharacterListChanged$.subscribe((characterList) =>{
      console.log(characterList);

      if (characterList != null) {
        this.charactersList = characterList;
      }
    });

    this.charactersService.onCharacterChanged$.subscribe((changedCharacter) =>{
      if (this.charactersList != null) {
        if (changedCharacter != null) {
          const index = findCharacterIndex(this.charactersList,changedCharacter);
          this.charactersList[index] = changedCharacter;
        }
      }
    });
  }

}
