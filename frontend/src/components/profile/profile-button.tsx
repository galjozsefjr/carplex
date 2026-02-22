'use client';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Link } from '@chakra-ui/react';
import NavLink from 'next/link';
import type { FC } from 'react';
import { useAuthContext } from '@/auth/auth.context';

export const ProfileButton: FC = () => {
  const { user, logout } = useAuthContext();

  if (!user) {
    return (
      <Button as={NavLink} href="/login" size="sm" variant="primary">
        Belépés
      </Button>
    );
  }

  return (
    <Box>
      <Link as={NavLink} href="/profile">
        Üdv, {user.lastName}
      </Link>
      <IconButton aria-label="Kilépés" icon={<ExternalLinkIcon />} marginLeft="2" onClick={logout} size="sm" variant="transparent" />
    </Box>
  );
};
