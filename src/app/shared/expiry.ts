import { Ingredient } from './ingredient';

export type ExpiryStatus =
  'kein Ablaufdatum' |
  'abgelaufen' |
  'bald ablaufend' |
  'haltbar';

export function parseGermanDate(value: string): Date | undefined {
  const parts = value.split('/');

  if (parts.length !== 3) {
    return undefined;
  }

  const day = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const year = Number(parts[2]);

  const date = new Date(year, month, day);

  if (
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    return undefined;
  }

  return date;
}

export function getExpiryStatus(
  ingredient: Ingredient
): ExpiryStatus {

  if (!ingredient.expiryDate) {
    return 'kein Ablaufdatum';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiryDate = new Date(ingredient.expiryDate);
  expiryDate.setHours(0, 0, 0, 0);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const difference = Math.ceil(
    (
      expiryDate.getTime() -
      today.getTime()
    ) /
    millisecondsPerDay
  );

  if (difference < 0) {
    return 'abgelaufen';
  }

  if (difference <= 3) {
    return 'bald ablaufend';
  }

  return 'haltbar';
}

export function getExpiryClass(
  ingredient: Ingredient
): string {

  const status = getExpiryStatus(ingredient);

  if (status === 'abgelaufen') {
    return 'expired';
  }

  if (status === 'bald ablaufend') {
    return 'expiring-soon';
  }

  return 'expiry-ok';
}

export function isExpiringSoon(
  ingredient: Ingredient
): boolean {

  return getExpiryStatus(ingredient) ===
    'bald ablaufend';
}