import type { Metadata } from 'next';
import './globals.css';
import { Container, Flex } from '@chakra-ui/react';
import { AuthProvider } from '@/auth/auth.provider';
import { CarPlexLogo } from '@/components/logo/CarplexLogo';
import { ProfileButton } from '@/components/profile/ProfileButton';
import { fonts } from '@/theme/fonts';
import { ThemeProvider } from '@/theme/theme-provider';

export const metadata: Metadata = {
  title: 'CarPlex',
  description: 'Drive-in movies'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={fonts.montSerrat.variable} lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Container maxWidth="7xl">
              <Flex alignItems="center" justifyContent="space-between" marginBottom="4">
                <CarPlexLogo />
                <ProfileButton />
              </Flex>
              {children}
              <Flex backgroundColor="background.medium" justifyContent="center" paddingY="6">
                <CarPlexLogo />
              </Flex>
            </Container>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
