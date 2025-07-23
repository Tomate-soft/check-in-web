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
                        <div key={table.tableNum} className={styles.table}>
                            <span>{table.status}</span>
                        </div>
                    ))}
            </main>
      </div>
    </main>
  );
}