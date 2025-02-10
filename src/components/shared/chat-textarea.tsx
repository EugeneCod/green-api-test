import { SendHorizontalIcon } from 'lucide-react';

import { Textarea, IconButton } from '@/components/ui';

import type { TextareaProps } from '../ui/textarea';

interface ChatTextareaProps extends TextareaProps {
  onSendMessage: VoidFunction;
}

export const ChatTextarea = (props: ChatTextareaProps) => {
  const { value, onChange, onSendMessage } = props;
  return (
    <div className="p-4 grid grid-cols-[1fr_min-content]">
      <Textarea
        value={value}
        placeholder="Введите сообщение"
        onChange={onChange}
      />
      <IconButton onClick={onSendMessage} className="self-end" IconComponent={SendHorizontalIcon} />
    </div>
  );
};
