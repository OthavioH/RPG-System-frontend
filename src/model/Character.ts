import { IAttribute } from "./Attribute";
import { ISkill } from "./Skill";

export interface ICharacter {
    id: number;
    name: string;
    hp?: number;
    maxHp?: number;
    sanity?:number;
    maxSanity?:number;
    playerName?: string;
    age?: number;
    gender?: string;
    attributes?:IAttribute[];
    skills?:ISkill[];
}