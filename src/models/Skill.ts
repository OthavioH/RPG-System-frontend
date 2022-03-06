import { SkillExperienceLevel } from "./SkillExperienceLevel";

export interface ISkill {
    id: string;
    name: string;
    value: number;
    experienceLevel:SkillExperienceLevel;
    description: string;
}