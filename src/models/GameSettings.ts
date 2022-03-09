import { IAbility } from "./Ability";
import { IAttribute } from "./Attribute";
import { IDiceRoll } from "./DiceRoll";
import { IRitual } from "./Ritual";
import { ISkill } from "./Skill";

export interface IGameSettings {
    id:string;
    diceScreenTime: number;
    diceCooldown: number;
    skills?: ISkill[];
    lastRolls: IDiceRoll[];
    attributes?: IAttribute[];
    abilities?: IAbility[];
    rituals?:IRitual[];
}