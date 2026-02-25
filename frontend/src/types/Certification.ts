export type Certification = 'KN' | '6' | '12' | '16' | '18' | 'X';

export const CertificationList: Record<Certification, string> = {
  KN: 'Korhatár nélkül megtekinthető',
  '6': '6 éven aluliak számára nem ajánlott',
  '12': '12 éven aluliak számára nem ajánlott',
  '16': '16 éven aluliak számára nem ajánlott',
  '18': '18 éven aluliak számára nem ajánlott',
  X: 'Felnőtt tartalom'
};
