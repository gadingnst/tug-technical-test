import 'package:flutter/material.dart';
import 'package:wellness_app/modules/wellness_packages/components/wellness_package_card.dart';
import 'package:wellness_app/modules/wellness_packages/controllers/wellness_packages_controller.dart';

class WellnessPackagesPage extends StatefulWidget {
  final bool isDarkMode;
  final VoidCallback onToggleThemeMode;

  const WellnessPackagesPage({
    super.key,
    required this.isDarkMode,
    required this.onToggleThemeMode,
  });

  @override
  State<WellnessPackagesPage> createState() => _WellnessPackagesPageState();
}

class _WellnessPackagesPageState extends State<WellnessPackagesPage> {
  late final WellnessPackagesController controller;
  late final Future<void> initialLoad;

  @override
  void initState() {
    super.initState();
    controller = WellnessPackagesController();
    initialLoad = controller.initialize();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: initialLoad,
      builder: (context, _) {
        return AnimatedBuilder(
          animation: controller,
          builder: (context, child) {
            return Scaffold(
              appBar: AppBar(
                title: const Text('Wellness Packages'),
                actions: [
                  IconButton(
                    onPressed: widget.onToggleThemeMode,
                    icon: Icon(
                      widget.isDarkMode ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
                    ),
                  ),
                ],
              ),
              body: _buildBody(context),
            );
          },
        );
      },
    );
  }

  Widget _buildBody(BuildContext context) {
    if (controller.isInitialLoading && controller.packages.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    if (controller.errorMessage != null && controller.packages.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                controller.errorMessage!,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              FilledButton(
                onPressed: controller.refresh,
                child: const Text('Coba Lagi'),
              ),
            ],
          ),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: controller.refresh,
      child: ListView.builder(
        controller: controller.scrollController,
        padding: const EdgeInsets.all(16),
        itemCount: controller.packages.length + 1,
        itemBuilder: (context, index) {
          if (index < controller.packages.length) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: WellnessPackageCard(package: controller.packages[index]),
            );
          }

          if (controller.isLoadingMore) {
            return const Padding(
              padding: EdgeInsets.symmetric(vertical: 24),
              child: Center(child: CircularProgressIndicator()),
            );
          }

          if (!controller.hasMore) {
            return const Padding(
              padding: EdgeInsets.symmetric(vertical: 24),
              child: Center(child: Text('Semua paket sudah ditampilkan')),
            );
          }

          return const SizedBox.shrink();
        },
      ),
    );
  }
}
