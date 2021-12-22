import styled from 'styled-components';

export const Container = styled.section`
  max-width: 30rem;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    margin-bottom: 2rem;
    font-weight: 600;
  }
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 1rem;

  span {
    font-size: 12px;
    font-style: italic;
    margin-bottom: 0.3rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: stretch;
  width: 100%;
  margin-bottom: 2rem;
`;
