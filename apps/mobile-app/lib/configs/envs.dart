import 'package:flutter_dotenv/flutter_dotenv.dart';

class Envs {
  static const String defaultCoreApiBaseUrl = 'http://localhost:9100';

  static String get coreApiBaseUrl {
    try {
      return dotenv.env['CORE_API_BASE_URL'] ?? defaultCoreApiBaseUrl;
    } catch (_) {
      return defaultCoreApiBaseUrl;
    }
  }
}
