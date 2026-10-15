// src/utils/formatters.js
export const money = value => value == null ? null : `₹${Number(value).toLocaleString('en-IN')}`;

export function priceLabel(product) {
  const prices = (product.formats || [])
    .map(format => format.price)
    .filter(price => typeof price === 'number');
  if (!prices.length) return 'Price to be added';
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  return lowest === highest ? money(lowest) : `From ${money(lowest)}`;
}

export function imageUrl(path) {
  if (!path) return '';
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;
}