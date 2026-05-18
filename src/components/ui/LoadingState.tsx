import styles from './LoadingState.module.scss';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Cargando dulces delicias...' }: LoadingStateProps) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.loading__spinner} />
      <p className={styles.loading__text}>{message}</p>
    </div>
  );
}
