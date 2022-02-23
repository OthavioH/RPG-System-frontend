import { IAttribute } from "./Attribute";
import { Inventory } from "./Inventory";
import { InventoryItem } from "./InventoryItem";
import { ISkill } from "./Skill";
import { IWeapon } from "./Weapon";

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
    weapons?:IWeapon[];
    inventory?:Inventory;
    notes:string;
}