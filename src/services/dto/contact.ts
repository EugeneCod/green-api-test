export interface ContactDTO {
  id: string; // пример: '79025552233@c.us'
  name: string; // Имя или пустая строка
  contactName: string; // Имя или пустая строка
  type: 'user' | 'group';
}

export interface CheckWhatsappDTO {
  existsWhatsapp: boolean;
}

export interface AvatarDTO {
  urlAvatar: string;
}
