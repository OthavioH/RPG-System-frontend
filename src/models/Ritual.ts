export interface IRitual {
    id:string;
    name:string;
    circle:number;
    execution:string;
    range:string;
    target:string;
    duration:string;
    description:string;
    resistance:string;
    elements:RitualElement[];
}

export enum RitualElement {
    energy = 'energia',
    death = 'morte',
    knowledge = 'conhecimento',
    fear = 'medo',
    blood = 'sangue',
    unknown = '?'
}