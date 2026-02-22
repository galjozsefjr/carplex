import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';
import { fieldBaseStyle } from './input';

const { definePartsStyle } = createMultiStyleConfigHelpers(inputAnatomy.keys);

export const textAreaTheme = defineStyleConfig({
  baseStyle: definePartsStyle({
    field: fieldBaseStyle
  }),
  variants: {
    outline: fieldBaseStyle
  }
});
