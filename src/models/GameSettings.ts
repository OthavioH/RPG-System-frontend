import { IAbility } from "./Ability";
import { IAttribute } from "./Attribute";
import { IDiceRoll } from "./DiceRoll";
import { ISkill } from "./Skill";

export interface IGameSettings {
    diceScreenTime: number;
    diceCooldown: number;
    skills?: ISkill[];
    lastRolls: IDiceRoll[];
    attributes?: IAttribute[];
    abilities?: IAbility[];
}