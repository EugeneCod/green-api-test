export interface ChatHistoryDTO {
  type: 'outgoing' | 'incoming';
  timestamp: number;
  typeMessage: 'textMessage' | 'extendedTextMessage' | string;
  textMessage: string;
  idMessage: string;
}

export interface SendMessageDTO {
  idMessage: string;
}
