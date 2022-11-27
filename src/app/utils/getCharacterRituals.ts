import { GameSettingsService } from 'src/app/game-settings.service';
import { ICharacter } from 'src/models/Character';
import { IRitual } from 'src/models/Ritual';

export default async function getCharacterRituals(character:ICharacter, gameSettingsService:GameSettingsService){

  const gameSettingsRituals = (await gameSettingsService.getGameSettings()).rituals ?? [];
  const rituals = character.rituals.map<IRitual>(
    (ritualID)=>{
      return gameSettingsRituals.filter((ritual)=> ritual.id == ritualID)[0];
    }
  );

  return rituals.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
};
