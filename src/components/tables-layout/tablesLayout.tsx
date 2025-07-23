import { Table } from '@/store/useTableStore';
import styles from './tablesLayout.module.css';
interface Props {
  tablesArray: Table[];
  onClose: () => void;
}
export default function TablesLayout({
 tablesArray,
 onClose
}: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <header>
            <button className={styles.closeButton} onClick={onClose}>
                x
            </button>
            
        </header>
        <main>
                    {tablesArray.map((table) => (
                        <div key={table.id} className={styles.table}>
                            <span>{table.name}</span>
                            <span>{table.status}</span>
                        </div>
                    ))}
            </main>
      </div>
    </main>
  );
}