import { Table } from "@/store/useTableStore";
import { TableStateManager } from "../tableStateManager/tableStateManager";
import styles from "./tablesGrid.module.css";
import { useState } from "react";
import { CheckInRegister } from "@/app/home/page";

interface Props {
    tablesArray: Table[];
    user: { name: string; lastName: string };
    registers: CheckInRegister[];
    setRegisters: (registers: CheckInRegister[]) => void;
}

enum ModalOptions {
    INITIAL_STATE
}

export default function TablesGrid({ tablesArray, user, registers, setRegisters }: Props) {
    const [modalOption, setModalOption] = useState<ModalOptions>(ModalOptions.INITIAL_STATE);
    return (
       <div>
           <header className={styles.header}>
            <div className={styles.addRegister}>
             <button onClick={()=> {
                        setRegisters([...registers, { name: '', initialTime: '', finalTime: '', resumeTime: '', status: '', diners: 1 }]);
                    }}>Guardar cambios<img src="/sendIcon.svg"/></button>
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
                        <TableStateManager register={register} registerArray={registers} tables={tablesArray} addAction={(data)=> {setRegisters(data)}} index={index}/>
                    </li>   
                ))}
            </ul>
        </div>
    );
}
