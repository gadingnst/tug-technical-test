import 'package:wellness_app/configs/envs.dart';
import 'package:wellness_app/libs/base_http/base_http.dart';
import 'package:wellness_app/libs/common/models/api_response.dart';
import 'package:wellness_app/modules/wellness_packages/models/wellness_packages_page.dart';

class WellnessApi {
  final BaseHttp http;

  WellnessApi({BaseHttp? http})
      : http = http ??
            BaseHttp(
              baseUrl: Envs.coreApiBaseUrl,
            );

  Future<WellnessPackagesPage> getWellnessPackages({
    required int page,
    required int limit,
  }) async {
    final json = await http.getJson(
      '/mobile/packages',
      queryParameters: {
        'page': page,
        'limit': limit,
      },
    );

    final response = ApiResponse<WellnessPackagesPage>.fromJson(
      json,
      (payloadJson) => WellnessPackagesPage.fromJson(
        payloadJson is Map<String, dynamic> ? payloadJson : <String, dynamic>{},
      ),
    );

    if (!response.success) {
      final firstError = response.errors.isNotEmpty ? response.errors.first : response.message;
      throw Exception(firstError);
    }

    return response.payload;
  }
}
