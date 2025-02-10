import { ChangeEvent, useRef, useLayoutEffect } from 'react';

export interface TextareaProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MIN_TEXTAREA_HEIGHT = 35;

export const Textarea = (props: TextareaProps) => {
  const { value, placeholder, onChange } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    // Сброс высоты требуется при каждой перерисовке
    if (textareaRef.current) {
      textareaRef.current.style.height = null!;
      // Установка высоты
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT,
      )}px`;
    }
  }, [value]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event);
  }

  return (
    <textarea
      className={
        'bg-secondary-bg-diff rounded-md text-input resize-none p-1 w-full outline-0 border border-transparent hover:border-emerald-600 focus:shadow-[0_0_4px_rgb(125,125,125)] placeholder-secondary-txt'
      }
      ref={textareaRef}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
    />
  );
};
