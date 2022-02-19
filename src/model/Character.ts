import { IAttribute } from "./Attribute";
import { ISkill } from "./Skill";

export interface ICharacter {
    id: number;
    nome: string;
    hp?: number;
    hpTotal?: number;
    sanity?:number;
    sanityTotal?:number;
    jogador?: string;
    idade?: number;
    genero?: string;
    attributes?:IAttribute[];
    skills?:ISkill[];
}