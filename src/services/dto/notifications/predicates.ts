import type { NotificationWithData } from '.';
import type { IncomingMessageReceived, IncomingTextMessage } from './Incoming-message-received';

export function isNotificationWithData(x: unknown): x is NotificationWithData {
  return typeof x === 'object' && x !== null && 'receiptId' in x && 'body' in x;
}

export function isIncomingMessageRecieved(x: object): x is IncomingMessageReceived {
  return (
    'typeWebhook' in x &&
    x.typeWebhook === 'incomingMessageReceived' &&
    'instanceData' in x &&
    'timestamp' in x &&
    'idMessage' in x &&
    'senderData' in x &&
    'messageData' in x
  );
}

export function isIncomingTextMessage(x: object): x is IncomingTextMessage {
  return 'typeMessage' in x && x.typeMessage === 'textMessage' && 'textMessageData' in x;
}
