import { Button, Center, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useAuthContext } from '@/auth/auth.context';

export const ProfilePage: FC = () => {
  const { user, inProgress, logout } = useAuthContext();

  return (
    <VStack alignItems="flex-start" bgColor="background.dark" px="16" py="9" spacing={4}>
      {inProgress ? (
        <Center minHeight="lg">
          <Spinner rotate="true" />
        </Center>
      ) : (
        user && (
          <>
            <Heading as="h2">
              Üdvözöljük, {user.firstName} {user.lastName}
            </Heading>
            <Text>Email cím: {user.email}</Text>
            <Button onClick={logout} variant="primary">
              Kilépés
            </Button>
          </>
        )
      )}
    </VStack>
  );
};
