import { ButtonHTMLAttributes, memo } from 'react';

interface IProps extends ButtonHTMLAttributes<any> {
  children: React.ReactNode;
}

const ButtonComponent = ({ children, ...props }: IProps): JSX.Element => {
  return (
    <button
      className="px-7 rounded-full bg-cyan-400 py-2 hover:bg-cyan-700"
      {...props}
    >
      <span className="text-gray-800 font-semibold">{children}</span>
    </button>
  );
};

export const Button = memo(ButtonComponent);
