import styled from 'styled-components';

export const Container = styled.section`
  max-width: 30rem;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
  }

  hr {
    margin: 1rem 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;
