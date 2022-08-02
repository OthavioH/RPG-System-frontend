import { IWeapon } from 'src/models/Weapon';

export class EditWeaponDialogAction {
    public weapon: IWeapon;
    constructor(weapon: IWeapon) {
        this.weapon = weapon;
    }
}

export class DeleteWeapon extends EditWeaponDialogAction{
    constructor(weapon: IWeapon) {
        super(weapon);
    }
}

export class EditWeapon extends EditWeaponDialogAction{
    constructor(weapon: IWeapon) {
        super(weapon);
    }
}