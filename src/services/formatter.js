export const getFormattedPercent = value => `${Math.round(value * 100)}%`;
export const emailToSlug = email => email.split('@')[0].replace('.', '');
