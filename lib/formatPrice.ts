export function formatServicePrice(
  price: number | null,
  period: string | null,
  variant: "short" | "long" = "short"
): string | null {
  if (price == null) return null;
  if (period) {
    return variant === "long" ? `${price}€ / ${period}` : `${price}€/${period}`;
  }
  return variant === "long" ? `À partir de ${price}€` : `Dès ${price}€`;
}