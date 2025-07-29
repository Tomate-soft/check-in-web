import { Table} from "@/store/useTableStore";
import { TableStateManager } from "../tableStateManager/tableStateManager";
import styles from "./tablesGrid.module.css";
import { use, useEffect, useState } from "react";
import { CheckInRegister } from "@/app/home/page";
import TablesLayout from "../tables-layout/tablesLayout";
import { User } from "@/store/useUserStore";
import { useOperatingPeriodStore } from "@/store/usePeriodStore";

interface Props {
    tablesArray: Table[];
    user: User;
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
    const getCurrentPeriod = useOperatingPeriodStore((state)=> state.getCurrentPeriod);
    const addRegisters = useOperatingPeriodStore((state) => state.addRegisters);
    const updatePeriod = useOperatingPeriodStore((state) => state.updatePeriod);
    const currentPeriod = useOperatingPeriodStore((state)=> state.period);
    const newRegister: CheckInRegister = {
        name: "",
        initialTime: "",
        finalTime: "",
        resumeTime: "",
        status: "",
        diners: 1,
    };

    const handleUpdate = ()=> {
        updatePeriod(currentPeriod._id, registers)
    }

    const handleClick = ()=> {
                        setRegisters([...registers, { name: '', initialTime: '', finalTime: '', resumeTime: '', status: '', diners: 1 }]);
                    }

    useEffect(() => {
        getCurrentPeriod();
        if(!selectedRegister){
          setSelectedRegister(newRegister);  
        }  
        addRegisters([]);
    }, [modalOption]);
    return (
       <div>
           <header className={styles.header}>
            <div className={styles.addRegister}>
                <button onClick={handleClick}>Añadir nuevo registro<img src="/sendIcon.svg"/></button>
                <button onClick={()=> setModalOption(ModalOptions.TABLES_LAYOUT)}>Mapa de mesas <img src="/table.svg" alt="" /></button>
                <button  onClick={handleUpdate}>Guardar cambios</button>
            </div>
            <div className={styles.logo}>
                <img src="/tomatePOSlogo.svg" alt="logo" />
                <span>Check in</span>
             </div>
             <div className={styles.userInfo}>
             <h2>{`${user.name} ${user.lastName}`}</h2>
             <h3>{`${user.employeeNumber} ${user.role.role.name}`}</h3>
             </div>
             {/* { currentPeriod && <span>{new Date(currentPeriod.createdAt).toLocaleDateString("ES-mx")}</span> } */}
           </header>
            <ul className={styles.tablesGrid}>
                {currentPeriod?.registers?.map((register, index) => (
                    < li key={index}>
                        <TableStateManager setSelectedTable={(table)=> {
                            setSelectedRegister(register);
                            setModalOption(ModalOptions.TABLES_LAYOUT);
                        }} register={register} registerArray={registers} tables={tablesArray} addAction={(data)=> {setRegisters(data)}} index={index}/>
                    </li>   
                ))}
                    <button onClick={handleClick} className={styles.addButton}><img src="/add-icon.svg" alt="" />Añadir nuevo registro</button>
            </ul>
            {
                modalOption === ModalOptions.TABLES_LAYOUT && <TablesLayout selectedRegister={selectedRegister} setSelectedRegister={setSelectedRegister} selectedTable={selectedTable} setSelectedTable={(table)=> {setSelectedTable(table)}} tablesArray={tablesArray} onClose={()=> {
                    setModalOption(ModalOptions.INITIAL_STATE);
                    setSelectedTable(null);
                    setSelectedRegister(null);
                }} />
            }
        </div>
    );
}
