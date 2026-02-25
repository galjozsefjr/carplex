import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';
import { fieldBaseStyle } from './input';

const { definePartsStyle } = createMultiStyleConfigHelpers(selectAnatomy.keys);

export const selectTheme = defineStyleConfig({
  baseStyle: definePartsStyle({
    field: {
      ...fieldBaseStyle,
      paddingRight: 10
    },
    stepperGroup: {
      width: 10
    },
    stepper: {
      borderColor: 'transparent',
      color: 'text.highlighted'
    }
  })
});
