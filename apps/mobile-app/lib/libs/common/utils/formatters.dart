String formatPriceInCents(int priceInCents) {
  final price = priceInCents / 100;
  return '\$${price.toStringAsFixed(2)}';
}

String formatDurationMinutes(int durationMinutes) {
  return '$durationMinutes min';
}
