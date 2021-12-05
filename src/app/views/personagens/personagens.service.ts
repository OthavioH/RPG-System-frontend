import { Injectable } from '@angular/core';

import { IPersonagem } from '../../../model/Personagem';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {

  constructor() { }
  personagens: IPersonagem[] = [
    {
      id: 1,
      nome:'Kaiser',
      jogador: 'Calango',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    {
      id: 2,
      nome:'Kaiser',
      jogador: 'Calango',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    {
      id: 3,
      nome:'Kaiser',
      jogador: 'Calango',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    {
      id: 4,
      nome:'Kaiser',
      jogador: 'Calango',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    {
      id: 5, 
      nome:'Kaiser',
      jogador: 'Calango',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    {
      id: 6,
      nome:'Kaiser',
      jogador: 'Calango',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    {
      id: 7,
      nome:'Kaiser',
      jogador: 'Calango',
      ocupacao: 'Desempregado',
      formacaoAcademica: 'Bacharelado em Ciência da Computação',
      idade: 18,
      genero: 'Masculino',
      localNascimento: 'Arujá, SP - Brasil',
      transtornosMentais: 'Nenhum'
    },
    
  ]
}
