/**
 * TempCheck Utility Helper Functions
 */

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
