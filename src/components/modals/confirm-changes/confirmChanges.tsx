import styles from './confirmChanges.module.css';


interface Props {
  loading: boolean;
  errors: Error | string | null | boolean;
  isOpen: boolean;
  onClose: () => void;
  children?: string;
  actionType?: () => void;
  route?: string;
  closeModal?: any;
  conflict?: any;
  navigate?: () => void;
}

export default function ConfirmChangesModal({
  loading,
  errors,
  isOpen,
  onClose,
  children,
  actionType,
  route,
  closeModal,
  conflict,
  navigate,
}: Props) {

  if (!isOpen) return null;
  if (!loading && !errors) {
    setTimeout(async () => {
      if (actionType) {
        actionType()
      }
      onClose();
      if (route) {
        navigate();
      }
      if (closeModal) {
        closeModal();
      }
    }, 1500);
  } else if (!loading && errors) {
    setTimeout(async () => {
      if (actionType) {
        actionType()
      }
      if (route) {
        navigate();
      }
      if (closeModal) {
        closeModal();
      }
      onClose();
    }, 1500);
  }
  return (
    <div className={styles.container}>
      {loading ? (
        // <ConfirmLoader />
        <span>Loading...</span>
      ) : errors ? (
        <div className={styles.modal}>
          <img src="/errorIcon.svg" alt="check-icon" />
          <h1 className={styles.tittle}>No se pudo completar</h1>
        </div>
      ) : (
        <div className={styles.modal}>
          <img src="/checkIcon.svg" alt="check-icon" />
          <h1 style={{fontSize: "32px", fontWeight: "200"}} className={styles.tittle}>{children}</h1>
        </div>
      )}
    </div>
  );
}
