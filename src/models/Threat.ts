import { ThreatService } from '../app/views/common/create-threat-dialog/threat.service';
export class Threat {
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

  constructor(private threatService: ThreatService, newThread: Threat) {
    this.id = newThread.id;
    this.vd = newThread.vd;
    this.name = newThread.name;
    this.description = newThread.description;
    this.imageUrl = newThread.imageUrl;
    this.element = newThread.element;
    this.secondElements = newThread.secondElements;
    this.skills = newThread.skills;
    this.size = newThread.size;
    this.type = newThread.type;
    this.disturbingPresence = newThread.disturbingPresence;
    this.senses = newThread.senses;
    this.defenses = newThread.defenses;
    this.healthPoints = newThread.healthPoints;
    this.vulnerabilities = newThread.vulnerabilities;
    this.attributes = newThread.attributes;
    this.displacements = newThread.displacements;
    this.actions = newThread.actions;
    this.enigma = newThread.enigma;
  }

  async save() {
    await this.threatService.updateThreat(this);
  }
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
  UNKNOWN = 'Unknown',
}
