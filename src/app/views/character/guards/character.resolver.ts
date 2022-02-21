import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICharacter } from 'src/model/Character';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Injectable({ providedIn: 'root' })
export class CharacterResolver implements Resolve<ICharacter> {

    constructor(private charactersService: CharactersService,) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ICharacter> | Promise<ICharacter> | ICharacter {
        const id = route.params["id"];
        return this.charactersService.getCharacterById(id);
    }
}