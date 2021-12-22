import { forwardRef, InputHTMLAttributes, memo } from 'react';

import * as Styles from './styles';

interface IProps extends InputHTMLAttributes<any> {
  label?: string;
}

const InputComponent = forwardRef<HTMLInputElement, IProps>(
  ({ label }, ref): JSX.Element => {
    return (
      <Styles.Container>
        {label && <Styles.Label>{label}</Styles.Label>}

        <input
          ref={ref}
          className="w-full bg-transparent border-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent py-1 px-2 rounded-full"
        />
      </Styles.Container>
    );
  }
);

export const Input = memo(InputComponent);
