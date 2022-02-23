export interface IWeapon {
    id: string;
    name: string;
    damage: string;
    criticalDamage: string;
    type: string;
    currentAmmo:number;
    maxAmmo:number;
    attacksQuantity:number;
    range:number;
    malfunction:number;
    rangeInArea:number;
}