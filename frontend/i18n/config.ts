export type Locale = (typeof locales)[number];

export const locales = ['ru', 'kk'] as const;
export const defaultLocale: Locale = 'ru';