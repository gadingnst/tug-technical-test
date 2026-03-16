import 'package:flutter/material.dart';
import 'package:wellness_app/libs/common/ui/base_card.dart';
import 'package:wellness_app/libs/common/utils/formatters.dart';
import 'package:wellness_app/modules/wellness_packages/models/wellness_package.dart';

class WellnessPackageCard extends BaseCard {
  WellnessPackageCard({
    super.key,
    required WellnessPackage package,
  }) : super(
          child: _WellnessPackageCardBody(package: package),
        );
}

class _WellnessPackageCardBody extends StatelessWidget {
  final WellnessPackage package;

  const _WellnessPackageCardBody({required this.package});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          package.name,
          style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
        ),
        if (package.description != null && package.description!.trim().isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(
            package.description!,
            style: textTheme.bodyMedium?.copyWith(color: colorScheme.onSurfaceVariant),
          ),
        ],
        const SizedBox(height: 14),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            _MetaChip(label: formatPriceInCents(package.price)),
            _MetaChip(label: formatDurationMinutes(package.durationMinutes)),
          ],
        ),
      ],
    );
  }
}

class _MetaChip extends StatelessWidget {
  final String label;

  const _MetaChip({required this.label});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: colorScheme.primary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: colorScheme.primary,
            ),
      ),
    );
  }
}
