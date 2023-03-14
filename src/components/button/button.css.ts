import { style } from '@vanilla-extract/css';
import { themeVars } from '../theme';

export const container = style({
  padding: 10,
  backgroundColor: themeVars.color.brand
});
