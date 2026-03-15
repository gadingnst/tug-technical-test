import 'package:wellness_app/modules/wellness_packages/models/wellness_package.dart';

class WellnessPackagesMeta {
  final int page;
  final int limit;
  final int total;
  final int totalPages;

  WellnessPackagesMeta({
    required this.page,
    required this.limit,
    required this.total,
    required this.totalPages,
  });

  factory WellnessPackagesMeta.fromJson(Map<String, dynamic> json) {
    return WellnessPackagesMeta(
      page: (json['page'] as num?)?.toInt() ?? 1,
      limit: (json['limit'] as num?)?.toInt() ?? 10,
      total: (json['total'] as num?)?.toInt() ?? 0,
      totalPages: (json['total_pages'] as num?)?.toInt() ?? 1,
    );
  }
}

class WellnessPackagesPage {
  final List<WellnessPackage> data;
  final WellnessPackagesMeta meta;

  WellnessPackagesPage({
    required this.data,
    required this.meta,
  });

  factory WellnessPackagesPage.fromJson(Map<String, dynamic> json) {
    final rawData = json['data'];
    final packages = rawData is List
        ? rawData
            .whereType<Map<String, dynamic>>()
            .map(WellnessPackage.fromJson)
            .toList()
        : <WellnessPackage>[];

    final metaJson = json['meta'];
    return WellnessPackagesPage(
      data: packages,
      meta: WellnessPackagesMeta.fromJson(
        metaJson is Map<String, dynamic> ? metaJson : <String, dynamic>{},
      ),
    );
  }
}
