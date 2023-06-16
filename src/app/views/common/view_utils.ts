import { ICharacter } from 'src/models/Character';
import * as uuid from 'uuid';

export function generateRandomId(): string {
  return uuid.v4();
}

export function findCharacterIndex(
  characterList: ICharacter[],
  characterToFind: ICharacter
): number {
  console.log(characterToFind);

  const character = characterList.find((c) => c.name == characterToFind.name);
  console.log(character);

  return characterList.indexOf(character);
}
