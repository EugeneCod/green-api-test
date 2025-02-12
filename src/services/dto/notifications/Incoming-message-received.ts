interface SenderData {
  chatId: string; //"79001234568@c.us",
  sender: string; //"79001234568@c.us",
  senderName: string; //"Иван",
  senderContactName: string; //"Иван Васильевич"
}

export interface IncomingTextMessage {
  typeMessage: 'textMessage';
  textMessageData: TextMessageData;
  quotedMessage?: object;
}

interface TextMessageData {
  textMessage: string;
  isTemplateMessage: boolean;
}

export interface IncomingMessageReceived {
  typeWebhook: 'incomingMessageReceived';
  instanceData: object;
  timestamp: number;
  idMessage: 'string';
  senderData: SenderData;
  messageData: IncomingTextMessage | object;
}
