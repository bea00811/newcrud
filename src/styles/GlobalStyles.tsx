import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
    background: #f2f2f2;
    padding: 20px;
  }

  @media (max-width: 600px) {
    body {
      padding: 10px;
    }
  }
`;

export default GlobalStyles;