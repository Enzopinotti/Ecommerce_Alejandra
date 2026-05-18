import { AlertCircle } from 'lucide-react';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'No pudimos cargar el catálogo en este momento. Intentá nuevamente en unos minutos.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.error} role="alert">
      <div className={styles.error__icon}>
        <AlertCircle />
      </div>
      <h3 className={styles.error__title}>¡Ups! Algo salió mal</h3>
      <p className={styles.error__message}>{message}</p>
      {onRetry && (
        <button className={styles.error__button} onClick={onRetry}>
          Reintentar cargar
        </button>
      )}
    </div>
  );
}
