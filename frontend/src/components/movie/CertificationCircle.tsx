import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import type { Certification } from '@/types/Certification';

export interface CertificationCircleProps {
  certification?: Certification | null;
}

const RatingStyle = {
  border: 'solid 1px',
  borderRadius: '50%',
  borderColor: 'white',
  flexShrink: 0,
  fontSize: 'xl',
  fontWeight: 300,
  lineHeight: '3em',
  height: '3em',
  textAlign: 'center',
  width: '3em'
};

export const CertificationCircle: FC<CertificationCircleProps> = ({ certification }) => <Box sx={RatingStyle}>{certification ?? '?'}</Box>;
