export interface IRitual {
    id:string;
    name:string;
    circle:string;
    execution:string;
    range:string;
    target:string;
    duration:string;
    description:string;
    elements:RitualElement[];
}

export enum RitualElement {
    energy = 'energia',
    death = 'morte',
    knowledge = 'conhecimento',
    fear = 'medo',
    blood = 'sangue',
    unknown = 'desconhecido'
}