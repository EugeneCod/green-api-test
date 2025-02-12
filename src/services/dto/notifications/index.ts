import type { IncomingMessageReceived } from './Incoming-message-received';

export type ReceiveNotificationDTO = NotificationWithData | null;

export interface DeleteNotificationDTO {
  result: boolean;
}

export interface NotificationWithData {
  receiptId: number;
  body: IncomingMessageReceived | object;
}
