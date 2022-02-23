import { IAttribute } from "./Attribute";
import { ISkill } from "./Skill";

export interface IGameSettings {
    diceScreenTime: number;
    diceCooldown: number;
    skills?: ISkill[];
    attributes?: IAttribute[];
}