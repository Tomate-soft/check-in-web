import { Table } from '@/store/useTableStore';
import styles from './tablesLayout.module.css';
import { CheckInRegister } from '@/app/home/page';

interface Props {
  tablesArray: Table[];
  onClose: () => void;
  selectedTable: Table;
  setSelectedTable: (table: Table) => void;
  selectedRegister?: CheckInRegister | null;
  setSelectedRegister?: (register: CheckInRegister | null) => void;
}
export default function TablesLayout({
 tablesArray,
 onClose,
 selectedTable,
 setSelectedTable,
 selectedRegister,
 setSelectedRegister,
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
                                        <header className={styles.selectedHeader}>
                                            <h3>Comensales</h3>
                                        </header>
                                        <main >
                                            <div className={styles.tablesNumSelector}>
                                                <button>-</button>
                                                <input value={selectedRegister.diners}/> 
                                                <button>+</button>
                                            </div>
                                        </main>
                                        <footer>
                                            <button className={styles.assignButton} >
                                                Asignar mesa
                                            </button>
                                        </footer>
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
