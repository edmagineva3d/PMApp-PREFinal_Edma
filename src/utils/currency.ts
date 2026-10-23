/**
 * Formats a numeric value into Philippine Peso (PHP) format.
 * Example: 2490 -> ₱2,490.00
 */
export function formatCurrency(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

/**
 * Compact currency format for high numbers in dashboard cards.
 * Example: ₱125.4K
 */
export function formatCompactCurrency(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  if (safeAmount >= 1_000_000) {
    return `₱${(safeAmount / 1_000_000).toFixed(2)}M`;
  }
  if (safeAmount >= 100_000) {
    return `₱${(safeAmount / 1_000).toFixed(1)}K`;
  }
  return formatCurrency(safeAmount);
}

