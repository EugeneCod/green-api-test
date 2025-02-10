// export interface Message {
//   direction: 'outgoing' | 'incoming';
//   message: string;
//   timestamp: number;
// }

export interface BriefInfoContact {
  id: string; // пример: '79025552233@c.us'
  phoneNumber: string; // пример: +79025552233
  name: string;
}

export interface ChatHistoryItem {
  type: 'outgoing' | 'incoming';
  timestamp: number;
  textMessage: string;
  idMessage: string;
}

export interface RegistrationData {
  idInstance: string;
  apiTokenInstance: string;
}
