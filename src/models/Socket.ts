import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
export class Socket {
    socket:any
    constructor(){
      this.socket = io(`${environment.apiUrl}`);
    }
}
