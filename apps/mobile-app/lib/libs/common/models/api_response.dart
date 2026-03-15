class ApiResponse<T> {
  final bool success;
  final String message;
  final List<String> errors;
  final T payload;

  ApiResponse({
    required this.success,
    required this.message,
    required this.errors,
    required this.payload,
  });

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Object? payloadJson) parsePayload,
  ) {
    final errorList = json['errors'];
    return ApiResponse<T>(
      success: json['success'] == true,
      message: json['message']?.toString() ?? '',
      errors: errorList is List ? errorList.map((item) => item.toString()).toList() : [],
      payload: parsePayload(json['payload']),
    );
  }
}
