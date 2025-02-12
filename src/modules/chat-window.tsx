import { useContext, useEffect, useRef, useState } from 'react';

import deafaultUserAvatar from '@/assets/icons/default-user.svg';
import { ChatTextarea, MessageListItem } from '@/components/shared';
import { InstanceContext } from '@/contexts';
import { Api } from '@/services/api-client';
import { useContactUrlAvatar } from '@/hooks';
import { cn } from '@/lib/utils/cn';
import {
  isIncomingMessageRecieved,
  isIncomingTextMessage,
  isNotificationWithData,
} from '@/services/dto/notifications/predicates';

import type { BriefInfoContact, ChatHistoryItem } from '@/@types/green-api';

interface ChatWindowProps {
  contact: BriefInfoContact | null;
}

export const ChatWindow = (props: ChatWindowProps) => {
  const { contact } = props;
  const [currentMessageValue, setCurrentMessageValue] = useState('');
  const [messages, setMessages] = useState<ChatHistoryItem[]>([]);
  const [isFetchingNotification, setIsFetchingNotification] = useState(false);

  const instanceContext = useContext(InstanceContext);
  const urlAvatar = useContactUrlAvatar(instanceContext?.registrationData, contact?.id);
  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [contact]);

  useEffect(() => {
    if (instanceContext?.registrationData && contact) {
      Api.chat
        .getChatHistory(instanceContext?.registrationData, contact.id)
        .then((messages) => {
          setMessages(messages);
        })
        .catch(console.error);
    }
  }, [contact, instanceContext?.registrationData]);

  useEffect(() => {
    async function fetchNotification() {
      if (!instanceContext?.registrationData || !contact || isFetchingNotification) {
        return;
      }
      setIsFetchingNotification(true);
      try {
        const data = await Api.notifications.receiveNotification(
          instanceContext.registrationData,
          10,
        );
        if (isNotificationWithData(data)) {
          if (
            isIncomingMessageRecieved(data.body) &&
            isIncomingTextMessage(data.body.messageData)
          ) {
            const idMessage = data.body.idMessage;
            const timestamp = data.body.timestamp;
            const textMessage = data.body.messageData.textMessageData.textMessage;
            const chatId = data.body.senderData.chatId;

            if (
              chatId === contact.id &&
              !messages.some((message) => message.idMessage === idMessage)
            ) {
              const newMessage: ChatHistoryItem = {
                type: 'incoming',
                timestamp,
                textMessage,
                idMessage,
              };
              setMessages((prev) => [...prev, newMessage]);
            }
          }

          await Api.notifications.deleteNotification(
            instanceContext.registrationData,
            data.receiptId,
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingNotification(false);
      }
    }

    const id = setTimeout(fetchNotification, 4000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNotification, contact, instanceContext?.registrationData]);

  async function handleSendMessage() {
    try {
      if (instanceContext?.registrationData && contact) {
        const newMessageId = await Api.chat.sendMessage(
          instanceContext?.registrationData,
          contact.id,
          currentMessageValue,
        );
        const newMessage: ChatHistoryItem = {
          type: 'outgoing',
          timestamp: Math.trunc(Date.now() / 1000),
          textMessage: currentMessageValue,
          idMessage: newMessageId,
        };
        setMessages((prev) => [...prev, newMessage]);
        setCurrentMessageValue('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="bg-secondary-bg border-l border-r border-section-border h-screen flex flex-col justify-between">
      {contact && (
        <>
          <header className="py-3 px-4 border-b border-section-border">
            <div className="flex items-center gap-x-2">
              <span className="w-12 h-12 rounded-[100%] bg-gray-600 flex items-center justify-center overflow-hidden">
                <img
                  className={cn('w-12 h-12', { 'w-8 h-8': !urlAvatar })}
                  src={urlAvatar || deafaultUserAvatar}
                  alt="Аватар"
                />
              </span>
              <span>{contact.name || contact.phoneNumber}</span>
            </div>
          </header>

          <div className='relative bg-[url(@/assets/images/chat-bg.png)] flex-auto before:content-[""] before:absolute before:inset-0 before:bg-chat-mask flex flex-col overflow-hidden'>
            <ul
              ref={messageListRef}
              className="text-primary-txt z-10 flex flex-auto flex-col-reverse gap-y-1 pb-4 overflow-y-scroll scrollbar-custom">
              {messages.map(({ idMessage, ...message }) => (
                <MessageListItem key={idMessage} {...message} />
              )).reverse()}
            </ul>
          </div>
          <ChatTextarea
            onSendMessage={handleSendMessage}
            value={currentMessageValue}
            onChange={(evt) => {
              setCurrentMessageValue(evt.target.value);
            }}
          />
        </>
      )}
    </section>
  );
};
