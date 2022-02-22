import { IAttribute } from "./Attribute";
import { ISkill } from "./Skill";

export interface GameSettings {
    diceScreenTime: number;
    diceCooldown: number;
    skills?: ISkill[];
    attributes?: IAttribute[];
}