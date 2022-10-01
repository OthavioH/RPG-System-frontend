import { ICharacter } from 'src/models/Character';
import * as uuid from 'uuid';

export function generateRandomId(): string {
  return uuid.v4();
}

export function findCharacterIndex(
  characterList: ICharacter[],
  characterToFind: ICharacter
): number {
  const character = characterList.find((c) => c.id == characterToFind.id);
  return characterList.indexOf(character);
}
