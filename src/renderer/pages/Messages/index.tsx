import { useRef } from 'react';
import { Button, Input } from 'renderer/components';
import { useMessage } from 'renderer/hooks/useMessage';
import * as Styles from './styles';

export const Messages = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages } = useMessage();

  const handleClickSend = () => {
    const message = inputRef.current?.value as string;

    window.electron.sendMessage(message);

    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Styles.Container>
      <h1>Mensagens</h1>

      <Styles.FormContainer>
        <Input ref={inputRef} label="Mensagem" />

        <Button onClick={handleClickSend}>Enviar</Button>
      </Styles.FormContainer>

      <Styles.MessagesContainer>
        {messages.map((message, index) => (
          <Styles.Message key={index}>
            <span>{message.name || '-'}</span>

            <p>{message.text}</p>
          </Styles.Message>
        ))}
      </Styles.MessagesContainer>
    </Styles.Container>
  );
};
