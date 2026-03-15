import 'package:flutter_test/flutter_test.dart';
import 'package:wellness_app/app/app.dart';

void main() {
  testWidgets('App menampilkan layar wellness packages', (WidgetTester tester) async {
    await tester.pumpWidget(const WellnessApp());
    expect(find.text('Wellness Packages'), findsOneWidget);
  });
}
