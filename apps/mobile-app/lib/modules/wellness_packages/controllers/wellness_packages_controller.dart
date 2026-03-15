import 'package:flutter/material.dart';
import 'package:wellness_app/libs/base_http/base_http_exception.dart';
import 'package:wellness_app/libs/common/api/wellness.dart';
import 'package:wellness_app/modules/wellness_packages/models/wellness_package.dart';

class WellnessPackagesController extends ChangeNotifier {
  final WellnessApi api;
  final ScrollController scrollController = ScrollController();
  final int pageSize;

  int _currentPage = 0;
  bool _hasMore = true;
  bool _isInitialLoading = false;
  bool _isLoadingMore = false;
  String? _errorMessage;
  List<WellnessPackage> _packages = <WellnessPackage>[];

  WellnessPackagesController({
    WellnessApi? api,
    this.pageSize = 10,
  }) : api = api ?? WellnessApi() {
    scrollController.addListener(_onScroll);
  }

  List<WellnessPackage> get packages => _packages;
  bool get hasMore => _hasMore;
  bool get isInitialLoading => _isInitialLoading;
  bool get isLoadingMore => _isLoadingMore;
  String? get errorMessage => _errorMessage;

  Future<void> initialize() async {
    await refresh();
  }

  Future<void> refresh() async {
    _currentPage = 0;
    _hasMore = true;
    _errorMessage = null;
    _packages = <WellnessPackage>[];
    _isInitialLoading = true;
    notifyListeners();

    await _loadPage(1, replaceData: true);
    _isInitialLoading = false;
    notifyListeners();
  }

  Future<void> loadNextPage() async {
    if (_isInitialLoading || _isLoadingMore || !_hasMore) {
      return;
    }

    _isLoadingMore = true;
    notifyListeners();

    await _loadPage(_currentPage + 1, replaceData: false);
    _isLoadingMore = false;
    notifyListeners();
  }

  Future<void> _loadPage(int page, {required bool replaceData}) async {
    try {
      final pageResult = await api.getWellnessPackages(
        page: page,
        limit: pageSize,
      );

      _errorMessage = null;
      _currentPage = pageResult.meta.page;
      _hasMore = pageResult.meta.page < pageResult.meta.totalPages;

      if (replaceData) {
        _packages = pageResult.data;
      } else {
        _packages = [..._packages, ...pageResult.data];
      }
    } catch (error) {
      _errorMessage = _mapErrorMessage(error);
    }
  }

  String _mapErrorMessage(Object error) {
    if (error is BaseHttpException) {
      return error.message;
    }
    return 'Failed to load wellness packages';
  }

  void _onScroll() {
    if (!scrollController.hasClients) {
      return;
    }

    final threshold = scrollController.position.maxScrollExtent - 200;
    if (scrollController.position.pixels >= threshold) {
      loadNextPage();
    }
  }

  @override
  void dispose() {
    scrollController.removeListener(_onScroll);
    scrollController.dispose();
    super.dispose();
  }
}
