interface PreloaderProps {
  paddingTop?: number;
}

export const Preloader = (props: PreloaderProps) => {
  const { paddingTop = 0 } = props;
  return (
    <div style={{ paddingTop }}>
      <div
        className={`
          relative w-38 h-38 my-8 mx-auto rounded-[50%] border-3 border-transparent
        border-t-emerald-500 animate-[spin_2s_linear_infinite] p-4
          before:content-[''] before:absolute before:inset-1 before:rounded-[50%] before:border-3 before:border-transparent
          before:border-t-cyan-500  before:animate-[spin_3s_linear_infinite]
          after:content-[''] after:absolute after:inset-1 after:rounded-[50%] after:border-3 after:border-transparent
          after:border-t-emerald-500  after:animate-[spin_1.5s_linear_infinite]
        `}
      />
    </div>
  );
};
