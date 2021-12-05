import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personagem-form',
  templateUrl: './personagem-form.component.html',
  styleUrls: ['./personagem-form.component.scss']
})
export class PersonagemFormComponent implements OnInit {

  resultadoDado: number = 0;


  constructor() { }

  ngOnInit(): void {
  }


  rolarDado(tipoDeDado: number): void {
    this.resultadoDado = this.getRandom(tipoDeDado);
  }

  getRandom(max: number): number {
    return Math.floor( Math.random() * max + 1);
  }
}
