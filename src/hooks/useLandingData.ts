// ============================================
// Hook para cargar datos de la landing
// Una sola llamada, estado centralizado
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { fetchLandingData, isApiConfigured } from '@/services/alejandraSheetService';
import type { DataState } from '@/types/api';

export function useLandingData(): DataState & { refetch: () => void } {
  const [state, setState] = useState<DataState>({
    loading: true,
    error: null,
    data: null,
  });

  const loadData = useCallback(async () => {
    if (!isApiConfigured()) {
      setState({
        loading: false,
        error: null,
        data: null,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetchLandingData();

      if (response.ok && response.data) {
        setState({
          loading: false,
          error: null,
          data: response.data,
        });
      } else {
        setState({
          loading: false,
          error: response.error || 'Error al cargar datos',
          data: null,
        });
      }
    } catch (err) {
      console.error('[useLandingData] Error:', err);
      setState({
        loading: false,
        error: 'No pudimos cargar el catálogo en este momento. Intentá nuevamente en unos minutos.',
        data: null,
      });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { ...state, refetch: loadData };
}
