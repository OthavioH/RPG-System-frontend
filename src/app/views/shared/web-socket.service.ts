import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from '../../../models/Socket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: Socket;

  constructor() {
    this.socket = new Socket();
  }

  listen(eventName: string):Observable<any> {
    return new Observable((subscriber) => {
      this.socket.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.socket.emit(eventName, data);
  }
}
