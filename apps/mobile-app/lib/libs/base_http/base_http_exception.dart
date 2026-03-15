class BaseHttpException implements Exception {
  final int statusCode;
  final String message;

  BaseHttpException({
    required this.statusCode,
    required this.message,
  });

  @override
  String toString() {
    return 'BaseHttpException(statusCode: $statusCode, message: $message)';
  }
}
