import { CaracthersService } from './personagens.service';
import {Title} from "@angular/platform-browser"
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICharacter } from 'src/model/Personagem';
import { IAttribute } from 'src/model/Attribute';
import { ISkill } from 'src/model/Skill';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})
export class PersonagensComponent implements OnInit {

  charactersList: ICharacter[];
  attributeList: IAttribute[];
  skillList: ISkill[];

  constructor(private charactersService: CaracthersService, private titleService: Title, private modalService:NgbModal) { 
    this.charactersList = this.charactersService.characters;
    this.titleService.setTitle("Dashboard | RPG System");
  }

  ngOnInit(): void {
    this.attributeList = this.charactersService.getAttributeList();
    this.skillList = this.charactersService.getSkillList();
  }

  onAddClick(): void {
    console.log("Adicionar novo personagem");
  }

  openModal(content): void {
    this.modalService.open(content, {centered:true});
  }

  close(content): void {
    this.modalService.dismissAll();
  }

}
