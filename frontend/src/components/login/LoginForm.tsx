import { Box, Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { loginFormValidate } from './loginFormValidate';

export interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  errorMessage?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ errorMessage, onLogin }) => {
  const form = useForm({
    values: {
      username: '',
      password: ''
    },
    resolver: yupResolver(loginFormValidate)
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { username, password } = formData;
    const loggedIn = await onLogin(username, password);
    if (!loggedIn) {
      form.setValue('password', '');
    }
  });

  const {
    formState: { errors, isSubmitting, isValidating },
    register
  } = form;

  return (
    <Box as="form" bgColor="background.dark" onSubmit={handleSubmit} px="16" py="9">
      <VStack marginX="auto" maxW="lg" spacing={5}>
        <Text color={errorMessage ? 'text.highlighted' : 'text-default'}>{errorMessage || 'Kérjük adja meg a felhasználónevét és jelszavát!'}</Text>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Felhasználónév:</FormLabel>
          <Input {...register('username')} />
          <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Jelszó:</FormLabel>
          <Input type="password" {...register('password')} />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup isDisabled={isSubmitting}>
          <Button onClick={() => form.reset()} type="reset" variant="transparent">
            Mégsem
          </Button>
          <Button isDisabled={isSubmitting || isValidating} type="submit">
            Belépés
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};
