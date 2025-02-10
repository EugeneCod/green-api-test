import { cn } from '@/lib/utils/cn';

interface MessageListItemProps {
  type: 'outgoing' | 'incoming';
  textMessage: string;
  timestamp: number;
}

export const MessageListItem = (props: MessageListItemProps) => {
  const { type, textMessage, timestamp } = props;
  const timeString = new Date(timestamp * 1000).toLocaleTimeString().slice(0, 5);
  console.log(timestamp);
  

  return (
    <li className={cn('flex justify-start px-6', { 'justify-end': type === 'outgoing' })}>
      <div
        className={cn(
          'max-w-[70%] min-w-18 relative p-2 pb-4 rounded-md after:content-[""] after:absolute after:top-0 after:border-8  after:border-transparent',
          {
            'bg-message-in-bg after:-left-2 after:border-t-message-in-bg rounded-tl-none':
              type === 'incoming',
          },
          {
            'bg-message-out-bg after:-right-2 after:border-t-message-out-bg rounded-tr-none':
              type === 'outgoing',
          },
        )}>
        
        <span className="text-sm/5 break-words">{textMessage}</span>
        <span className="absolute bottom-1 right-1 text-xs/3 text-secondary-txt" >{timeString}</span>
      </div>
    </li>
  );
};
