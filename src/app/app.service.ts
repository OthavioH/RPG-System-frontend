import { Injectable } from '@angular/core';
import envVars from './../../env.json';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl:string;

  constructor() {
    this.apiUrl = envVars.apiUrl;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

}
