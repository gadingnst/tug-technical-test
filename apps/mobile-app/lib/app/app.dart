import 'package:flutter/material.dart';
import 'package:wellness_app/modules/wellness_packages/pages/wellness_packages_page.dart';

class WellnessApp extends StatefulWidget {
  const WellnessApp({super.key});

  @override
  State<WellnessApp> createState() => _WellnessAppState();
}

class _WellnessAppState extends State<WellnessApp> {
  ThemeMode _themeMode = ThemeMode.system;

  bool get isDarkMode {
    if (_themeMode == ThemeMode.dark) {
      return true;
    }
    if (_themeMode == ThemeMode.light) {
      return false;
    }
    final brightness = WidgetsBinding.instance.platformDispatcher.platformBrightness;
    return brightness == Brightness.dark;
  }

  void toggleThemeMode() {
    setState(() {
      _themeMode = isDarkMode ? ThemeMode.light : ThemeMode.dark;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Wellness App',
      themeMode: _themeMode,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.teal,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: WellnessPackagesPage(
        isDarkMode: isDarkMode,
        onToggleThemeMode: toggleThemeMode,
      ),
    );
  }
}
