import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:wellness_app/main.dart';

void main() {
  testWidgets('App displays hello world', (WidgetTester tester) async {
    await tester.pumpWidget(const WellnessApp());
    expect(find.text('Hello World 👋'), findsOneWidget);
    expect(find.text('Wellness App'), findsOneWidget);
  });
}
