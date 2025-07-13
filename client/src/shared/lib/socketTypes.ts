import type { MessageT } from '../../entities/chat/model/chatTypes';

export interface ServerToClientEvents {
    message: (message: MessageT) => void;
  }
  
  export interface ClientToServerEvents {

    message: (message: Omit<MessageT, 'id'>) => void;
  }