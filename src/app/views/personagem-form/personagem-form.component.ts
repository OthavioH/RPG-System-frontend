import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';
import { CaracthersService } from '../personagens/personagens.service';

@Component({
  selector: 'app-personagem-form',
  templateUrl: './personagem-form.component.html',
  styleUrls: ['./personagem-form.component.scss']
})
export class PersonagemFormComponent implements OnInit {

  resultadoDado: number = 0;
  attributeList: IAttribute[];
  skillList: ISkill[];

  selectedSkill: ISkill;
  selectedAttribute: ISkill;

  constructor(private charactersService:CaracthersService, private modalService:NgbModal) {

  }

  ngOnInit(): void {
    this.attributeList = this.charactersService.getAttributeList();
    this.skillList = this.charactersService.getSkillList();
  }

  openModal(content, skill: ISkill): void {
    this.selectedSkill = skill;
    this.modalService.open(content, {centered:true,beforeDismiss: this.dismissDialog});
  }

  close(): void {
    this.modalService.dismissAll();
  }

  dismissDialog(): boolean {
    this.selectedSkill = null;
    this.selectedAttribute = null;
    return true;
  }


  rolarDado(tipoDeDado: number): void {
    this.resultadoDado = this.getRandom(tipoDeDado);
  }

  getRandom(max: number): number {
    return Math.floor( Math.random() * max + 1);
  }
}
