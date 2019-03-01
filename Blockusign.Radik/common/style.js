import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const globalStyles = () => {
  const GlobalStyles = createGlobalStyle`
    ${normalize()};
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
      font-variant-numeric: tabular-nums;
    }
    body, html{
      background: #F5F7FB;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      scroll-behavior: smooth;
    }
  `;
  return GlobalStyles;
};
