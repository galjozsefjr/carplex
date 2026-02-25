import { date, number, object, string } from 'yup';
import { CertificationList } from '@/types/Certification';

export const movieValidationSchema = object({
  title: string().required('Adja meg a film címét'),
  poster_path: string().required('Adja meg a film plakátjának elérését').url('Hibás URL cím'),
  overview: string().required('Adja meg a film leírását'),
  tagline: string().nullable().optional(),
  runtime: number().integer().typeError('Adja meg a film hosszát').required('Adja meg a film hosszát').min(0, 'Adja meg film percekben mért hosszát'),
  release_date: date()
    .nullable()
    .transform((current) => {
      return current instanceof Date && !current.getDate() ? null : current;
    })
    .required('Adja meg a bemutató dátumát'),
  certification: string()
    .oneOf([...Object.keys(CertificationList), ''], 'Válasszon egy lehetőséget')
    .nullable()
    .optional()
});
