import { axiosInstance } from '../instance';

import type { ChatHistoryItem, RegistrationData } from '@/@types/green-api';
import type { ChatHistoryDTO, SendMessageDTO } from '../dto/chat';

export const getChatHistory = async (
  { idInstance, apiTokenInstance }: RegistrationData,
  chatId: string,
) => {
  const { data } = await axiosInstance<ChatHistoryItem[]>({
    method: 'post',
    url: `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
    data: { chatId, count: 10 },
    transformResponse: (data: string) => {
      const parsedData: ChatHistoryDTO[] = JSON.parse(data);
      const chatHistory = parsedData
        .filter(
          (item) =>
            item.typeMessage === 'textMessage' || item.typeMessage === 'extendedTextMessage',
        )
        .map(({ type, timestamp, textMessage, idMessage }) => ({
          type,
          timestamp,
          textMessage,
          idMessage,
        }))
        .reverse();
      return chatHistory;
    },
  });
  return data;
};

export const sendMessage = async (
  { idInstance, apiTokenInstance }: RegistrationData,
  chatId: string,
  message: string,
) => {
  const { data } = await axiosInstance.post<SendMessageDTO>(
    `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    { chatId, message },
  );

  return data.idMessage;
};
