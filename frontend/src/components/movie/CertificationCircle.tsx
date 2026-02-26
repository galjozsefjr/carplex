import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import type { Certification } from '@/types/Certification';

export interface CertificationCircleProps {
  certification?: Certification | null;
  size?: string | number;
  fontSize?: string;
}

const RatingStyle = {
  border: 'solid 1px',
  borderRadius: '50%',
  borderColor: 'white',
  flexShrink: 0,
  fontWeight: 300,
  textAlign: 'center'
};

export const CertificationCircle: FC<CertificationCircleProps> = ({ certification, size = '3em', fontSize = 'xl' }) => (
  <Box fontSize={fontSize} height={size} lineHeight={size} sx={RatingStyle} width={size}>
    {certification ?? '?'}
  </Box>
);
