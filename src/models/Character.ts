import { IAbility } from "./Ability";
import { IAttribute } from "./Attribute";
import { Inventory } from "./Inventory";
import { InventoryItem } from "./InventoryItem";
import { IRitual } from "./Ritual";
import { ISkill } from "./Skill";
import { IWeapon } from "./Weapon";

export interface ICharacter {
    id: number;
    playerName?: string;
    name: string;
    profileImageUrl?:string;
    age?: number;
    gender?: string;
    class?:string;
    nex?: number;
    rank?: string;
    origin?: string;
    hp?: number;
    maxHp?: number;
    sanity?:number;
    maxSanity?:number;
    stressPoints?:number;
    maxStressPoints?:number;
    proficiences?:string;
    skills?:ISkill[];
    attributes?:IAttribute[];
    abilities?:IAbility[];
    rituals?:IRitual[];
    weapons?:IWeapon[];
    inventory?:Inventory;
    passiveDefense?:number,
    blockDefense?:number,
    dodgeDefense?:number,
    physicsResistence?:number,
    ballisticResistence?:number,
    bloodResistence?:number,
    energyResistence?:number,
    deathResistence?:number,
    knowledgeResistence?:number,
    insanityResistence?:number,
    notes:string;
}