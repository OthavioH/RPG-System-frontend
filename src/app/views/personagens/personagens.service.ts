import { Injectable } from '@angular/core';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';

import { ICharacter as ICharacter } from '../../../model/Personagem';

@Injectable({
  providedIn: 'root'
})
export class CaracthersService {

  constructor() { }

  attributeList: IAttribute[] = [
    {
      'id': 1,
      'name': 'Investigação',
      'description': 'Minha pika',
    },
    {
      'id': 2,
      'name': 'História',
      'description': 'Minha pika',
    },
    {
      'id': 3,
      'name': 'Minha pika',
      'description': 'Minha pika',
    },
    {
      'id': 4,
      'name': 'Cu de prego',
      'description': 'Minha pika',
    },
    {
      'id': 4,
      'name': 'Cu de prego',
      'description': 'Minha pika',
    },
    {
      'id': 4,
      'name': 'Cu de prego',
      'description': 'Minha pika',
    },
    {
      'id': 4,
      'name': 'Cu de prego',
      'description': 'Minha pika',
    },
    {
      'id': 4,
      'name': 'Cu de prego',
      'description': 'Minha pika',
    },
    
  ];
  skillList: ISkill[] = [
    {
      'id': 1,
      'name': 'Invocar bichão',
      'description': 'invoca bichão que dá 10 mil de dano',
    },
    {
      'id': 2,
      'name': 'Lava',
      'description': 'invoca bichão que dá 10 mil de dano',
    },
    {
      'id': 3,
      'name': 'Água',
      'description': 'invoca bichão que dá 10 mil de dano',
    },
    {
      'id': 4,
      'name': 'Terra',
      'description': 'invoca bichão que dá 10 mil de dano',
    },
    {
      'id': 4,
      'name': 'Terra',
      'description': 'invoca bichão que dá 10 mil de dano',
    },
    {
      'id': 4,
      'name': 'Terra',
      'description': 'invoca bichão que dá 10 mil de dano',
    },
  ];

  characters: ICharacter[] = [
    {
      id: 1,
      nome:'Cu de prego',
      jogador: 'Cu de barro',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    {
      id: 2,
      nome:'Cu de prego',
      jogador: 'Cu de barro',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
  ];

  getCharacters(): void{
    
  }

  getSkillList(): ISkill[] {
    return this.skillList;
  }

  getAttributeList(): IAttribute[] {
    return this.attributeList;
  }
}
