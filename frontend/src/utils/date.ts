import dayjs, { type ConfigType } from 'dayjs';
import locale from 'dayjs/locale/hu';

export const formatDate = (dateString: ConfigType) => {
  const date = dayjs(dateString);
  return date.format('YYYY-MM-DD');
};

export const formatDateTime = (dateString: ConfigType) => {
  const date = dayjs(dateString);
  return date.format('YYYY-MM-DDTHH:mm:ssZ[Z]');
};

export const localizedFormat = (dateString: ConfigType, format: string) => {
  const date = dayjs(dateString);
  return date.locale(locale).format(format);
};
