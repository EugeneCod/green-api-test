import { cn } from '@/lib/utils/cn';
import deafaultUserAvatar from '@/assets/icons/default-user.svg';
import { BriefInfoContact } from '@/@types/green-api';
import { useContext } from 'react';
import { InstanceContext } from '@/contexts';
import { useContactUrlAvatar } from '@/hooks';

interface ContactListItemProps extends PropsWithClassName {
  contact: BriefInfoContact;
  selected: boolean;
  onSelect: (contact: BriefInfoContact) => void;
}

export const ContactListItem = (props: ContactListItemProps) => {
  const { className, contact, selected, onSelect } = props;

  const instanceContext = useContext(InstanceContext);
  const urlAvatar = useContactUrlAvatar(instanceContext?.registrationData, contact.id);

  return (
    <li
      onClick={() => onSelect(contact)}
      className={cn(
        'flex items-center hover:bg-secondary-bg p-4 cursor-pointer',
        { 'bg-secondary-bg-diff hover:bg-secondary-bg-diff': selected },
        className,
      )}>
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
    </li>
  );
};
