import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1D242D;
    margin: 0;
    font-family: 'Roboto'
  }
  svg {
    color: white;
  }
`;

const PageLayout = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default PageLayout;

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;
