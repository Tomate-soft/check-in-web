import styles from "./styles.module.css";
import { Table } from "@/store/useTableStore";
import { CheckInRegister } from "@/app/home/page";

interface TableStateManagerProps {
  tables: Table[];
  register: CheckInRegister;
  registerArray: CheckInRegister[];
  addAction: (data: CheckInRegister[]) => void;
  index: number;
  setSelectedTable?: (table: Table) => void;
}

export const TableStateManager = ({
  tables,
  register,
  addAction,
  index,
  registerArray,
  setSelectedTable,
}: TableStateManagerProps) => {

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...registerArray];
    updated[index] = { ...updated[index], name: e.target.value };
    addAction(updated);
  };

  const handleDinersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const updated = [...registerArray];

    if (input === '') {
      updated[index] = { ...updated[index], diners: '' as unknown as number };
    } else {
      const value = Math.min(99, Number(input));
      updated[index] = { ...updated[index], diners: value };
    }

    addAction(updated);
  };

  const handleSave = () => {
    const updated = [...registerArray];
    const current = updated[index];
    const now = new Date();

    // Primera vez: guardar tiempo inicial
    if (!current.initialTime) {
      updated[index] = {
        ...current,
        initialTime: now.toISOString(),
        status: "started",
      };
    }
    // Segunda vez: guardar tiempo final y calcular duración
    else if (!current.finalTime) {
      const initial = new Date(current.initialTime);
      const diffMs = now.getTime() - initial.getTime();
      const diffMinutes = Math.floor(diffMs / 1000 / 60);
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      const resume = `${hours}h ${minutes}m`;

      updated[index] = {
        ...current,
        finalTime: now.toISOString(),
        resumeTime: resume,
        status: "completed",
      };
    }

    addAction(updated);
  };

  return (
    <div className={styles.tableStateManager}>
      <strong>{index + 1}</strong>
      <input
        type="number"
        min={1}
        max={99}
        className={styles.nameSpace}
        value={register.diners === undefined || register.diners === ('' as any) ? '' : register.diners}
        onChange={handleDinersChange}
        placeholder="Número de personas"
      />

      <input
        className={styles.nameSpace}
        value={register.name}
        onChange={handleNameChange}
        placeholder="Nombre del cliente"
      />

      <button
        className={styles.saveButton}
        onClick={() => {
          if (setSelectedTable) setSelectedTable(tables[index]);
        }}

        
      >
        <img src="/table.svg" alt="" />
      </button>
      <button
        className={styles.trashButton}
        onClick={() => {
          registerArray.splice(index, 1);
          addAction([...registerArray]);
        }}

        
      >
        <img src="/trash-icon.svg" alt="" />
      </button>
    </div>
  );
};
