class WellnessPackage {
  final int id;
  final String name;
  final String? description;
  final int price;
  final int durationMinutes;

  WellnessPackage({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.durationMinutes,
  });

  factory WellnessPackage.fromJson(Map<String, dynamic> json) {
    return WellnessPackage(
      id: (json['id'] as num?)?.toInt() ?? 0,
      name: json['name']?.toString() ?? '',
      description: json['description']?.toString(),
      price: (json['price'] as num?)?.toInt() ?? 0,
      durationMinutes: (json['duration_minutes'] as num?)?.toInt() ?? 0,
    );
  }
}
