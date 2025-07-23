import { Table } from '@/store/useTableStore';
import styles from './tablesLayout.module.css';
interface Props {
  tablesArray: Table[];
  onClose: () => void;
  selectedTable: Table;
  setSelectedTable: (table: Table) => void;
}
export default function TablesLayout({
 tablesArray,
 onClose,
 selectedTable,
 setSelectedTable
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
                  {tablesArray?.map((table) => {
                        const isSelected = selectedTable?._id === table?._id;
                        if (table.status !== 'free' || !table.user) return null;
                        return (
                            <div
                                key={table._id}
                                className={styles.table}
                                onClick={() => {
                                    if (table.status !== "free") return;
                                    setSelectedTable(table);
                                }}
                            >
                                {isSelected ? (
                                    <>
                                        <span >{table.tableNum}</span>
                                    </>
                                ) : (
                                    <>
                                        <header><span>{table?.user?.name ?? "No asignada"}</span></header>
                                        <main>{table.tableNum}</main>
                                        <footer>
                                           { table.user &&  <button>Abrir mesa</button>}
                                        </footer>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </main>
      </div>
    </main>
  );
}