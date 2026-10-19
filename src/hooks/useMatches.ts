import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMatches } from '../api/matches';
import type { MatchesData } from '../types/match';

type LoadMode = 'initial' | 'refresh';

export function useMatches() {
  const [data, setData] = useState<MatchesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  const load = useCallback(async (mode: LoadMode) => {
    // Новый запрос отменяет предыдущий, чтобы устаревший ответ не перезаписал свежий.
    requestRef.current?.abort();
    const request = new AbortController();
    requestRef.current = request;

    if (mode === 'initial') setIsLoading(true);
    else setIsRefreshing(true);
    setError(null);

    try {
      const result = await fetchMatches(request.signal);
      if (request.signal.aborted) return;
      setData(result);
      setUpdatedAt(new Date());
    } catch (e) {
      if (request.signal.aborted) return;
      setError(e instanceof Error ? e.message : 'Не удалось загрузить матчи.');
    } finally {
      if (requestRef.current === request) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    load('initial');
    return () => requestRef.current?.abort();
  }, [load]);

  const refresh = useCallback(() => load('refresh'), [load]);
  const retry = useCallback(() => load(data ? 'refresh' : 'initial'), [load, data]);

  return { data, error, isLoading, isRefreshing, updatedAt, refresh, retry };
}
