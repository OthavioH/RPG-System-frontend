import { Title } from '@angular/platform-browser';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  filter,
  takeUntil,
} from 'rxjs';
import {
  ActivatedRoute,
  GuardsCheckStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  Router,
  RouterEvent,
  RoutesRecognized,
} from '@angular/router';

import { CharactersService } from './shared/services/characters.service';
import { SkillsDialogComponent } from '../common/skills-dialog/skills-dialog.component';
import { AttributeDialogComponent } from '../common/attribute-dialog/attribute-dialog.component';
import { EditSkillDialogComponent } from 'src/app/views/common/edit-skill-dialog/edit-skill-dialog.component';
import { ICharacter } from 'src/models/Character';
import { IAttribute } from 'src/models/Attribute';
import { ISkill } from 'src/models/Skill';
import { CreateCharacterDialogComponent } from '../common/create-character-dialog/create-character-dialog.component';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IGameSettings } from 'src/models/GameSettings';
import { IAbility } from 'src/models/Ability';
import { ShowAbilityDetailsDialogComponent } from '../common/show-ability-details-dialog/show-ability-details-dialog.component';
import { EditAbilityDialogComponent } from '../common/edit-ability-dialog/edit-ability-dialog.component';
import { CreateRitualDialogComponent } from '../common/create-ritual-dialog/create-ritual-dialog.component';
import { IRitual } from 'src/models/Ritual';
import { EditRitualDialogComponent } from '../common/edit-ritual-dialog/edit-ritual-dialog.component';
import { findCharacterIndex } from '../common/view_utils';
import { ShowRitualDialogComponent } from '../common/show-ritual-dialog/show-ritual-dialog.component';
import { WebSocketService } from '../shared/web-socket.service';
import { loadingObserver$ } from 'src/app/views/home-page/home-page.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss', './../../app.component.scss'],
})
export class CharactersComponent implements OnInit {
  subscribe: Subscription;
  gameSettingsSubscription: Subscription;

  charactersList: ICharacter[] = [];
  attributeList: IAttribute[] = [];

  gameSettings: IGameSettings;
  skillList: ISkill[] = [];
  isLoading: boolean = true;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameSettingsService: GameSettingsService,
    private titleService: Title,
    private modalService: MatDialog,
    private socketService: WebSocketService
  ) {
    loadingObserver$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.activatedRoute.data.subscribe(
      (info: { gameSettings: IGameSettings }) => {
        this.gameSettings = info.gameSettings;
      }
    );

    this.gameSettingsService.onRollsListChanged$.subscribe((newRollList) => {
      this.gameSettings.lastRolls = newRollList;
    });

    this.titleService.setTitle('Dashboard | RPG System');
  }

  ngOnInit(): void {
    this.subscribeObservables();
    this.charactersService.getCharacters();
  }

  async subscribeObservables() {
    this.gameSettingsSubscription =
      this.gameSettingsService.updateGameSettingsEvent$.subscribe(
        (newGameSettings) => {
          this.gameSettings = newGameSettings;
          this.skillList =
            this.gameSettings.skills != null
              ? this.gameSettings.skills.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )
              : [];
          this.gameSettings.rituals =
            this.gameSettings.rituals != null
              ? this.gameSettings.rituals.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )
              : [];
        }
      );

    this.socketService
      .listen('editedCharacterList')
      .subscribe((data: { character: ICharacter; operation: string }) => {
        if (data != null) {
          switch (data.operation) {
            case 'delete':

              const characterIndex = findCharacterIndex(
                this.charactersList,
                data.character
              );

              this.charactersList.splice(characterIndex, 1);

              break;

            case 'create':
              this.charactersList.push(data.character);
              break;

            default:
              break;
          }
        }
      });

    this.socketService
      .listen('characterChanged')
      .subscribe((changedCharacter) => {
        if (this.charactersList != null) {
          if (changedCharacter != null) {
            const index = findCharacterIndex(
              this.charactersList,
              changedCharacter
            );
            this.charactersList[index] = changedCharacter;
            console.log(this.charactersList);
          }
        }
      });

    this.charactersList = await this.charactersService.getCharacters();

    this.subscribe = this.activatedRoute.data.subscribe(
      (info: { gameSettings: IGameSettings }) => {
        this.gameSettings = info.gameSettings;
      }
    );
    this.skillList =
      this.gameSettings.skills != null
        ? this.gameSettings.skills.sort((a, b) => a.name.localeCompare(b.name))
        : [];
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  onChangeDiceCooldown(value: number): void {
    this.gameSettings.diceCooldown = value;
  }

  onChangeDiceScreenTime(value: number): void {
    this.gameSettings.diceScreenTime = value;
  }

  saveGameSettings() {
    this.gameSettingsService.setGameTimers(
      this.gameSettings.diceCooldown,
      this.gameSettings.diceScreenTime
    );
  }

  createNewSkill(skillName: string, skillDescription: string): void {
    this.gameSettingsService.createNewSkill(skillName, skillDescription);
    this.close();
  }

  createNewAbility(abilityName: string, abilityDescription: string): void {
    this.gameSettingsService.createNewAbility(abilityName, abilityDescription);
    this.close();
  }

  deleteSkill(skillId: string): void {
    this.gameSettingsService.removeSkill(skillId);
  }

  deleteAbility(abilityId: string): void {
    this.gameSettingsService.removeAbility(abilityId);
  }

  deleteRitual(ritualId: string): void {
    this.gameSettingsService.removeRitual(ritualId);
  }

  openModal(content): void {
    this.modalService.open(content);
  }

  openEditSkillDialog(skill: ISkill): void {
    this.modalService.open(EditSkillDialogComponent, { data: skill });
  }

  openEditAbilityDialog(ability: IAbility): void {
    this.modalService.open(EditAbilityDialogComponent, { data: ability });
  }

  openEditRitualDialog(ritual: IRitual): void {
    this.modalService.open(EditRitualDialogComponent, { data: ritual });
  }

  openSkillDialog(skill: ISkill): void {
    this.modalService.open(SkillsDialogComponent, { data: skill });
  }

  openCreateRitualDialog() {
    this.modalService.open(CreateRitualDialogComponent);
  }

  openAbilityDialog(ability: IAbility): void {
    this.modalService.open(ShowAbilityDetailsDialogComponent, {
      data: ability,
    });
  }

  openRitualDialog(ritual: IRitual): void {
    this.modalService.open(ShowRitualDialogComponent, { data: ritual });
  }

  openAttributeDialog(attribute: IAttribute): void {
    this.modalService.open(AttributeDialogComponent, { data: attribute });
  }

  openCreateCharacterDialog(): void {
    this.modalService.open(CreateCharacterDialogComponent);
  }

  close(): void {
    this.modalService.closeAll();
  }
}
