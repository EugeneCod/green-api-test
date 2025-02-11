interface SenderData {
  chatId: string; //"79001234568@c.us",
  sender: string; //"79001234568@c.us",
  senderName: string; //"Иван",
  senderContactName: string; //"Иван Васильевич"
}

interface TextMessageData {
  textMessage: string;
}

interface MessageData {
  typeMessage: 'textMessage' | 'extendedTextMessage' | string;
  textMessageData: TextMessageData;
}

interface NotificationMessageFormat {
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
  timestamp: number;
}

interface ResultNotification {
  receiptId: number;
  body: NotificationMessageFormat | object;
}

export type ReceiveNotificationDTO = ResultNotification | null;

export interface DeleteNotificationDTO {
  result: boolean;
}
