import { TodoContextProvider } from './todo'

export const GlobalContext: React.FC = ({ children }) => {
  return <TodoContextProvider>{children}</TodoContextProvider>
}
