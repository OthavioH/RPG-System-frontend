export interface Threat {
  id: string;
  vd?: number;
  name: string;
  description?: string;
  imageUrl?: string;
  element?: ThreatElement;
  secondElements?: ThreatElement[];
  skills?: ThreatSkill[];
  size?: ThreatSize;
  type?: ThreatType;
  disturbingPresence?: DisturbingPresence;
  senses?: ThreatSenses;
  defenses?: ThreatDefense;
  healthPoints?: ThreatHealthPoints;
  vulnerabilities?: ThreatVulnerability[];
  attributes?: ThreatAttributes;
  displacements?: string[];
  actions?: ThreatAction[];
  enigma?: string;
}

export interface ThreatAction {
  id: number;
  name: string;
  description: string;
  actionType: ThreatActionType;
}

export enum ThreatActionType {
  FREE = 'livre',
  DEFAULT = 'padrão',
  MOVEMENT = 'movimento',
}

export interface ThreatAttributes {
  strength: number;
  agility: number;
  intelligence: number;
  perception: number;
  vigor: number;
}

export interface ThreatHealthPoints {
  max: number;
  current: number;
  hurt: number;
  immunities: string;
  resistances: string;
}

export interface ThreatResistances {
  ballistic: number;
  impact: number;
  cutting: number;
  drilling: number;
  energy: number;
  death: number;
  blood: number;
  knowledge: number;
}

export interface ThreatVulnerability {
  name: string;
}

export interface ThreatSenses {
  hearing: string;
  initiative: string;
}

export interface ThreatDefense {
  value: string;
  fortitude: string;
  reflex: string;
  will: string;
}

export interface DisturbingPresence {
  nex: number;
  dt: number;
  damage: string;
}

export enum ThreatSize {
  SMALL = 'pequeno',
  MEDIUM = 'médio',
  BIG = 'grande',
  HUGE = 'enorme',
  COLOSSAL = 'colossal',
}

export enum ThreatType {
  CREATURE = 'criatura',
  RELIC = 'relíquia',
  ANIMAL = 'animal',
  PERSON = 'pessoa',
}

export interface ThreatSkill {
  id: number;
  name: string;
  description: string;
}

export enum ThreatElement {
  BLOOD = 'Sangue',
  DEATH = 'Morte',
  ENERGY = 'Energia',
  KNOWLEDGE = 'Conhecimento',
  FEAR = 'Medo',
}
