import { IAbility } from 'src/models/Ability';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ICharacter } from 'src/models/Character';

export default async function getCharacterAbilities(character:ICharacter, gameSettingsService:GameSettingsService):Promise<IAbility[]>{

  const gameSettingsAbilities = (await gameSettingsService.getGameSettings()).abilities ?? [];
  const abilities = character.abilities.map<IAbility>(
    (abilityID)=>{
      return gameSettingsAbilities.filter((ability)=> ability.id == abilityID)[0];
    }
  );

  return abilities.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
};
