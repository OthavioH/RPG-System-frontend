import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Threat } from '../../../../models/Threat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThreatService {
  constructor(private http: HttpClient) {}

  async createThreat(threatObject: any): Promise<Threat> {
    const response = (await this.http
      .post(`${environment.apiUrl}/threats/create`, { threat: threatObject })
      .toPromise()) as Threat;
    return response;
  }

  async getThreats(): Promise<Threat[]> {
    const response = (await this.http
      .get(`${environment.apiUrl}/threats`)
      .toPromise()) as Threat[];
    return response;
  }

  async getThreatById(threatId: string): Promise<Threat> {
    const response = (await this.http
      .get(`${environment.apiUrl}/threats/${threatId}`)
      .toPromise()) as Threat;
    return response;
  }

  async updateThreat(threat: Threat): Promise<Threat> {
    const response = (await this.http
      .put(`${environment.apiUrl}/threats/${threat.id}/update`, {
        threat: threat,
      })
      .toPromise()) as Threat;
    return response;
  }

  async deleteThreat(threatId: string): Promise<void> {
    await this.http
      .delete(`${environment.apiUrl}/threats/${threatId}/delete`)
      .toPromise();
  }
}
