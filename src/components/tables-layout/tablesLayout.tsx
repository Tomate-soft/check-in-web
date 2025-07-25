import { Table, UseTableStore } from '@/store/useTableStore';
import styles from './tablesLayout.module.css';
import { CheckInRegister } from '@/app/home/page';
import { use, useState } from 'react';
import ConfirmChangesModal from '../modals/confirm-changes/confirmChanges';

interface Props {
  tablesArray: Table[];
  onClose: () => void;
  selectedTable: Table;
  setSelectedTable: (table: Table) => void;
  selectedRegister?: CheckInRegister | null;
  setSelectedRegister?: (register: CheckInRegister | null) => void;
}

enum ModalOptions {
  INITIAL_STATE = 'INITIAL_STATE',
  CONFIRM_CHANGES = 'CONFIRM_CHANGES',
}
export default function TablesLayout({
  tablesArray,
  onClose,
  selectedTable,
  setSelectedTable,
  selectedRegister,
  setSelectedRegister,
}: Props) {
  const [modalOption, setModalOption] = useState<ModalOptions>(ModalOptions.INITIAL_STATE);
  const openTableAction = UseTableStore((state) => state.openTable);
  const getTablesAction = UseTableStore((state) => state.getTables);
  const isLoading = UseTableStore((state) => state.isLoading);
  const errors = UseTableStore((state) => state.errors);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setSelectedRegister || !selectedRegister) return;

    const input = e.target.value;

    // Bloquear guion o cualquier caracter no dígito (solo permitir cadena vacía o dígitos)
    if (!/^\d*$/.test(input)) {
      return;
    }

    // Permitir borrar todo (input vacío)
    if (input === '') {
      setSelectedRegister({
        ...selectedRegister,
        diners: '' as unknown as number,
      });
      return;
    }

    // Validar máximo 2 dígitos
    if (input.length > 2) {
      return;
    }

    // Convertir a número, mínimo 1, máximo 99
    const num = Math.min(99, Math.max(1, parseInt(input)));

    setSelectedRegister({
      ...selectedRegister,
      diners: num,
    });
  };

  return (
    <main className={styles.screen}>
      <div>
        <header>
          <h2>Control de mesas</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <img src="/crossButton.svg" alt="cross-icon" />
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
                  if (table.status !== 'free') return;
                  setSelectedTable(table);
                }}
              >
                {isSelected ? (
                  <>
                    <header className={styles.selectedHeader}>
                      <h3>Comensales</h3>
                    </header>
                    <main>
                      <div className={styles.tablesNumSelector}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!setSelectedRegister || !selectedRegister) return;
                            const current = selectedRegister.diners;
                            const newValue =
                              typeof current === 'number' ? Math.max(1, current - 1) : 1;
                            setSelectedRegister({ ...selectedRegister, diners: newValue });
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"  // Cambiado a text para controlar mejor la entrada
                          value={
                            selectedRegister?.diners === undefined
                              ? ''
                              : selectedRegister.diners
                          }
                          onChange={handleInputChange}
                          onClick={(e) => e.stopPropagation()}
                          inputMode="numeric" // para teclado numérico en móviles
                          pattern="[0-9]*"     // para algunos navegadores
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!setSelectedRegister || !selectedRegister) return;
                            const current = selectedRegister.diners;
                            const newValue =
                              typeof current === 'number' ? current + 1 : 1;
                            setSelectedRegister({ ...selectedRegister, diners: newValue });
                          }}
                        >
                          +
                        </button>
                      </div>
                    </main>
                    <footer>
                      <button onClick={()=> {
                        if (!selectedTable || !selectedRegister) return;
                        openTableAction(selectedTable._id, { diners: selectedRegister.diners ?? 1 });
                        setModalOption(ModalOptions.CONFIRM_CHANGES);
                          
                      }} className={styles.assignButton}>Asignar mesa</button>
                    </footer>
                  </>
                ) : (
                  <>
                    <header>
                      <span>{table?.user?.name ?? 'No asignada'}</span>
                    </header>
                    <main>{table.tableNum}</main>
                    <footer>
                      {table.user && <button>Abrir mesa</button>}
                    </footer>
                  </>
                )}
              </div>
            );
          })}
        </main>
         {
        modalOption === ModalOptions.CONFIRM_CHANGES && <ConfirmChangesModal loading={isLoading} errors={errors} isOpen={true} onClose={()=> setModalOption(ModalOptions.INITIAL_STATE)} closeModal={onClose} actionType={getTablesAction}>Cambios guardados</ConfirmChangesModal>
      }
      </div>
     
    </main>
  );
}
