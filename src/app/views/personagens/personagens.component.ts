import { PersonagensService } from './personagens.service';
import { Component, OnInit } from '@angular/core';
import { IPersonagem } from 'src/model/Personagem';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})
export class PersonagensComponent implements OnInit {

  personagensLista: IPersonagem[];

  constructor(private personagensService: PersonagensService) { 
    this.personagensLista = personagensService.personagens;
  }

  ngOnInit(): void {
  }

  onAddClick(): void {
    console.log("Adicionar novo personagem");
    
  }

}
