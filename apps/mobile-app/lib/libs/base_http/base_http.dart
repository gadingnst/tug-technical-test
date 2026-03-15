import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:wellness_app/libs/base_http/base_http_exception.dart';

class BaseHttp {
  final String baseUrl;
  final Map<String, String> defaultHeaders;
  final http.Client client;

  BaseHttp({
    required this.baseUrl,
    http.Client? client,
    Map<String, String>? defaultHeaders,
  })  : client = client ?? http.Client(),
        defaultHeaders = defaultHeaders ?? const {'Content-Type': 'application/json'};

  Future<Map<String, dynamic>> getJson(
    String path, {
    Map<String, dynamic>? queryParameters,
    Map<String, String>? headers,
  }) async {
    final uri = _buildUri(path, queryParameters);
    final response = await client.get(uri, headers: _buildHeaders(headers));
    return _decode(response);
  }

  Uri _buildUri(String path, Map<String, dynamic>? queryParameters) {
    final baseUri = Uri.parse(baseUrl);
    final pathSegments = [
      ...baseUri.pathSegments.where((segment) => segment.isNotEmpty),
      ...path.split('/').where((segment) => segment.isNotEmpty),
    ];

    return baseUri.replace(
      pathSegments: pathSegments,
      queryParameters: queryParameters?.map(
        (key, value) => MapEntry(key, value.toString()),
      ),
    );
  }

  Map<String, String> _buildHeaders(Map<String, String>? headers) {
    return {
      ...defaultHeaders,
      ...?headers,
    };
  }

  Map<String, dynamic> _decode(http.Response response) {
    final body = response.body.isEmpty ? '{}' : response.body;
    final decoded = jsonDecode(body);
    final jsonMap = decoded is Map<String, dynamic> ? decoded : <String, dynamic>{};

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw BaseHttpException(
        statusCode: response.statusCode,
        message: _extractErrorMessage(jsonMap, response.statusCode),
      );
    }

    return jsonMap;
  }

  String _extractErrorMessage(Map<String, dynamic> jsonMap, int statusCode) {
    final errors = jsonMap['errors'];
    if (errors is List && errors.isNotEmpty) {
      final firstError = errors.first;
      if (firstError is String && firstError.isNotEmpty) {
        return firstError;
      }
    }

    final message = jsonMap['message'];
    if (message is String && message.isNotEmpty) {
      return message;
    }

    return 'Request failed with status code $statusCode';
  }
}
