import { RegistrationData } from '@/@types/green-api';
import { DeleteNotificationDTO, ReceiveNotificationDTO } from '../dto/notifications';
import { axiosInstance } from '../instance';

export const receiveNotification = async (
  { idInstance, apiTokenInstance }: RegistrationData,
  seconds: number,
) => {
  const { data } = await axiosInstance.get<ReceiveNotificationDTO>(
    `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${seconds}`,
  );

  return data;
};

export const deleteNotification = async (
  { idInstance, apiTokenInstance }: RegistrationData,
  receiptId: number,
) => {
  const { data } = await axiosInstance.delete<DeleteNotificationDTO>(
    `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
  );

  return data.result;
};
