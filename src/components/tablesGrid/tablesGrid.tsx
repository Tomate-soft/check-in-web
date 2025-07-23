import { Table } from "@/store/useTableStore";
import { TableStateManager } from "../tableStateManager/tableStateManager";
import styles from "./tablesGrid.module.css";
import { useState } from "react";
import { CheckInRegister } from "@/app/home/page";
import TablesLayout from "../tables-layout/tablesLayout";

interface Props {
    tablesArray: Table[];
    user: { name: string; lastName: string };
    registers: CheckInRegister[];
    setRegisters: (registers: CheckInRegister[]) => void;
}

enum ModalOptions {
    INITIAL_STATE,
    TABLES_LAYOUT,
}

export default function TablesGrid({ tablesArray, user, registers, setRegisters }: Props) {
    const [modalOption, setModalOption] = useState<ModalOptions>(ModalOptions.INITIAL_STATE);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [selectedRegister, setSelectedRegister] = useState<CheckInRegister | null>(null);
    return (
       <div>
           <header className={styles.header}>
            <div className={styles.addRegister}>
             <button onClick={()=> {
                        setRegisters([...registers, { name: '', initialTime: '', finalTime: '', resumeTime: '', status: '', diners: 1 }]);
                    }}>Guardar cambios<img src="/sendIcon.svg"/></button>
                    <button onClick={()=> setModalOption(ModalOptions.TABLES_LAYOUT)}>Mapa de mesas <img src="/table.svg" alt="" /></button>
            </div>
            <div className={styles.logo}>
                <img src="/tomatePOSlogo.svg" alt="logo" />
                <span>Check in</span>
             </div>
             <h1>{`${user.name} ${user.lastName}`}</h1>
           </header>
            <ul className={styles.tablesGrid}>
                {registers?.map((register, index) => (
                    < li key={index}>
                        <TableStateManager setSelectedTable={(table)=> {
                            setSelectedRegister(register);
                            setModalOption(ModalOptions.TABLES_LAYOUT);
                        }} register={register} registerArray={registers} tables={tablesArray} addAction={(data)=> {setRegisters(data)}} index={index}/>
                    </li>   
                ))}
            </ul>
            {
                modalOption === ModalOptions.TABLES_LAYOUT && <TablesLayout selectedRegister={selectedRegister} setSelectedRegister={setSelectedRegister} selectedTable={selectedTable} setSelectedTable={(table)=> {setSelectedTable(table)}} tablesArray={tablesArray} onClose={()=> setModalOption(ModalOptions.INITIAL_STATE)} />
            }
        </div>
    );
}
