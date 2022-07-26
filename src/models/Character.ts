import { CharactersService } from "src/app/views/characters/shared/services/characters.service";
import { IAbility } from "./Ability";
import { CharacterAttributes } from "./CharacterAttributes";
import { Inventory } from "./Inventory";
import { IRitual } from "./Ritual";
import { ISkill } from "./Skill";
import { IWeapon } from "./Weapon";

export class ICharacter {
    id: number;
    playerName?: string;
    profileImageUrl?:string;
    name: string;
    age?: number;
    gender?: string;
    nex?: number;
    rank?: string;
    class?:string;
    origin?: string;
    hp?: number;
    maxHp?: number;
    sanity?:number;
    maxSanity?:number;
    effortPoints?:number;
    maxEffortPoints?:number;
    proficiences?:string;
    skills?:ISkill[];
    attributes:CharacterAttributes;
    abilities?:IAbility[];
    rituals?:IRitual[];
    weapons?:IWeapon[];
    inventory?:Inventory;
    passiveDefense?:number;
    blockDefense?:number;
    dodgeDefense?:number;
    physicsResistence?:number;
    ballisticResistence?:number;
    bloodResistence?:number;
    energyResistence?:number;
    deathResistence?:number;
    knowledgeResistence?:number;
    insanityResistence?:number;
    notes:string;

    constructor(
        private charactersService:CharactersService, 
        characterToChange:ICharacter
        ) {
        this.id = characterToChange.id;
        this.playerName = characterToChange.playerName;
        this.profileImageUrl = characterToChange.profileImageUrl;
        this.name = characterToChange.name;
        this.age = characterToChange.age;
        this.gender = characterToChange.gender;
        this.nex = characterToChange.nex;
        this.rank = characterToChange.rank;
        this.class = characterToChange.class;
        this.origin = characterToChange.origin;
        this.hp = characterToChange.hp;
        this.maxHp = characterToChange.maxHp;
        this.sanity = characterToChange.sanity;
        this.maxSanity = characterToChange.maxSanity;
        this.effortPoints = characterToChange.effortPoints;
        this.maxEffortPoints = characterToChange.maxEffortPoints;
        this.proficiences = characterToChange.proficiences;
        this.skills = characterToChange.skills;
        this.attributes = characterToChange.attributes;
        this.abilities = characterToChange.abilities;
        this.rituals = characterToChange.rituals;
        this.weapons = characterToChange.weapons;
        this.inventory = characterToChange.inventory;
        this.passiveDefense = characterToChange.passiveDefense;
        this.blockDefense = characterToChange.blockDefense;
        this.dodgeDefense = characterToChange.dodgeDefense;
        this.physicsResistence = characterToChange.physicsResistence;
        this.ballisticResistence = characterToChange.ballisticResistence;
        this.bloodResistence = characterToChange.bloodResistence;
        this.energyResistence = characterToChange.energyResistence;
        this.deathResistence = characterToChange.deathResistence;
        this.knowledgeResistence = characterToChange.knowledgeResistence;
        this.insanityResistence = characterToChange.insanityResistence;
        this.notes = characterToChange.notes;
    };

    async saveCharacter():Promise<void>{
        console.log(this);
        
        this.inventory.usedSlots = 0;
        for (let index = 0; index < (this.inventory.items != null ? this.inventory.items.length : 0); index++) {
            const item = this.inventory.items[index];
            this.inventory.usedSlots += item.slots;
        }
        await this.charactersService.updateCharacter(this);
    }


    toJSON():string{
        const jsonString = `{
            "id":${this.id},
            "playerName":"${this.playerName}",
            "profileImageUrl":"${this.profileImageUrl}",
            "name":"${this.name}",
            "age":${this.age},
            "gender":"${this.gender}",
            "nex":${this.nex},
            "rank":"${this.rank}",
            "class":"${this.class}",
            "origin":"${this.origin}",
            "hp":"${this.hp}",
            "maxHp":"${this.maxHp}",
            "sanity":${this.sanity},
            "maxSanity":${this.maxSanity},
            "effortPoints":${this.effortPoints},
            "maxEffortPoints":${this.maxEffortPoints},
            "proficiences":"${this.proficiences}",
            "skills":${JSON.stringify(this.skills)},
            "attributes":${JSON.stringify(this.attributes)},
            "abilities":${JSON.stringify(this.abilities)},
            "rituals":${JSON.stringify(this.rituals)},
            "weapons":${JSON.stringify(this.weapons)},
            "inventory":${JSON.stringify(this.inventory)},
            "passiveDefense":${this.passiveDefense},
            "blockDefense":${this.blockDefense},
            "dodgeDefense":${this.dodgeDefense},
            "physicsResistence":${this.physicsResistence},
            "ballisticResistence":${this.ballisticResistence},
            "bloodResistence":${this.bloodResistence},
            "energyResistence":${this.energyResistence},
            "deathResistence":${this.deathResistence},
            "knowledgeResistence":${this.knowledgeResistence},
            "insanityResistence":${this.insanityResistence},
            "notes":"${this.notes}"
        }`;
        console.log(jsonString);
        
        return jsonString;
    }
}