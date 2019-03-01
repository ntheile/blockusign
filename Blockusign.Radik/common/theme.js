const colors = {
  purple: Object.assign('#574b90', {}),
  pink: '#f8a5c2',
  red: '#F27D66',
  borders: {
    light: 'hsl(202, 40%, 83%)',
  },
  gray: Object.assign('#303952', {
    mid: '#596275'
  }),
};
const breakpoints = ['40em', '52em', '64em', '72em', '85em'];
const fontSizes = [12, 14, 16, 20, 24, 28, 32, 36, 48, 64, 96, 128];
const space = [0, 4, 8, 12, 16, 24, 32, 48, 64, 96];
const lineHeights = [1, 1.125, 1.25, 1.5, 1.75];
const fontWeights = {
  light: 300,
  normal: 400,
  semibold: 600,
  bold: 700,
};
const fonts = {
  default: `-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
};
const radii = [0, 2, 4, 8];
const borders = [0, '1px solid', '2px solid'];
const transition = [undefined, '0.5s all cubic-bezier(.19,1,.22,1)'];
const shadows = {
  card: Object.assign('0px 4px 4px rgba(0, 0, 0, 0.05)', {}),
  general: Object.assign('0px 4px 4px rgba(0, 0, 0, 0.05)', {}),
  focused: Object.assign(`hsl(205,30%,95%) 0 0 0 3px`, {
    error: `hsla(10,58%,95%, 0.5) 0 0 0 3px`,
  }),
};

export const theme = {
  breakpoints,
  colors,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  radii,
  borders,
  shadows,
  transition,
  fonts,
};
