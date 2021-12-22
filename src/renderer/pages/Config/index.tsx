import { RouteComponentProps } from 'react-router';
import { Button, Input } from 'renderer/components';
import * as Styles from './styles';

export const Config = ({ history }: RouteComponentProps): JSX.Element => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { 0: name, 1: serverPort, 2: listenerIp, 3: listenerPort } = e.target;

    window.electron.store.setConfig({
      name: name.value,
      serverPort: serverPort.value,
      listenerIp: listenerIp.value,
      listenerPort: listenerPort.value,
    });

    history.push('/messages');
  };

  return (
    <Styles.Container>
      <h1>Configuração inicial</h1>

      <form onSubmit={handleSubmit}>
        <h2>Configuração do servidor</h2>

        <Input name="name" label="Nome de usuário" />

        <Input
          name="serverPort"
          label="Porta do servidor express (não funcionando ainda)"
        />

        <hr />

        <h2>Configuração do cliente</h2>

        <Input name="listenerIp" label="IP do servidor de comunicação" />

        <Input name="listenerPort" label="Porta do servidor de comunicação" />

        <Button type="submit">Salvar configurações</Button>
      </form>
    </Styles.Container>
  );
};
