import { ICharacter } from "src/models/Character";

export function generateRandomId():string {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

export function findCharacterIndex(characterList:ICharacter[], characterToFind:ICharacter):number {
   const character = characterList.find(c => c.id == characterToFind.id);
   return characterList.indexOf(character);
}