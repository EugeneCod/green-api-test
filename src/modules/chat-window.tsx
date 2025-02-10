import { useContext, useState } from 'react';

import deafaultUserAvatar from '@/assets/icons/default-user.svg';
import { cn } from '@/lib/utils/cn';

/* import type { Message } from '@/@types/green-api'; */
import { ChatTextarea } from '@/components/shared';
import { BriefInfoContact } from '@/@types/green-api';
import { useContactUrlAvatar } from '@/hooks';
import { InstanceContext } from '@/contexts';

interface ChatWindowProps {
  contact: BriefInfoContact | null;
}

export const ChatWindow = (props: ChatWindowProps) => {
  const { contact } = props;
  const [value, setValue] = useState('');

  const instanceContext = useContext(InstanceContext);

  const urlAvatar = useContactUrlAvatar(instanceContext?.registrationData, contact?.id);

  return (
    <section className="bg-secondary-bg border-l border-section-border h-screen flex flex-col justify-between">
      {contact && (
        <>
          <header className="py-3 px-4">
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
          <div className='relative bg-[url(@/assets/images/chat-bg.png)] flex-auto before:content-[""] before:absolute before:inset-0 before:bg-chat-mask '>
            Чат
          </div>
          <ChatTextarea
            onSendMessage={() => {
              console.log(value);
            }}
            value={value}
            onChange={(evt) => {
              setValue(evt.target.value);
            }}
          />
        </>
      )}
    </section>
  );
};
