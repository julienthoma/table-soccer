export const getFormattedPercent = value => `${Math.round(value * 100)}%`;

export const emailToSlug = email => email.split('@')[0].replace('.', '');

export const getScore = score => {
  const [p1, p2, p3, p4, p1Own, p2Own, p3Own, p4Own] = score;

  return [p1 + p2 + p3Own + p4Own, p3 + p4 + p1Own + p2Own];
};
