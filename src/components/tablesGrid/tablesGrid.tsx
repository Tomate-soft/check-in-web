import { Table} from "@/store/useTableStore";
import { TableStateManager } from "../tableStateManager/tableStateManager";
import styles from "./tablesGrid.module.css";
import { use, useEffect, useState } from "react";
import { CheckInRegister } from "@/app/home/page";
import TablesLayout from "../tables-layout/tablesLayout";
import { User } from "@/store/useUserStore";
import { useOperatingPeriodStore } from "@/store/usePeriodStore";
import ConfirmChangesModal from "../modals/confirm-changes/confirmChanges";

interface Props {
    tablesArray: Table[];
    user: User;
    registers: CheckInRegister[];
    setRegisters: (registers: CheckInRegister[]) => void;
}

enum ModalOptions {
    INITIAL_STATE,
    TABLES_LAYOUT,
    CONFIRM_CHANGES
}

export default function TablesGrid({ tablesArray, user, registers, setRegisters }: Props) {
    const [modalOption, setModalOption] = useState<ModalOptions>(ModalOptions.INITIAL_STATE);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [selectedRegister, setSelectedRegister] = useState<CheckInRegister | null>(null);
    const getCurrentPeriod = useOperatingPeriodStore((state)=> state.getCurrentPeriod);
    const addRegisters = useOperatingPeriodStore((state) => state.addRegisters);
    const updatePeriod = useOperatingPeriodStore((state) => state.updatePeriod);
    const currentPeriod = useOperatingPeriodStore((state)=> state.period);
    const isLoading = useOperatingPeriodStore((state)=> state.isLoading);
    const errors = useOperatingPeriodStore((state)=> state.errors);
    const [selectedIndex, setSelectedIndex ] =  useState<number>()
    const [showAll, setShowAll] = useState<boolean>(false)

    const newRegister: CheckInRegister = {
        name: "",
        initialTime: "",
        finalTime: "",
        resumeTime: "",
        status: "",
        diners: 1,
    };

    const handleUpdate = ()=> {
        setModalOption(ModalOptions.CONFIRM_CHANGES);
        updatePeriod(currentPeriod._id, currentPeriod?.registers)
    }

    const handleUpdateAssigTable = ()=> {
        const copy = [...currentPeriod?.registers];
        copy[selectedIndex] = { ...selectedRegister, status: "complete" };
        setModalOption(ModalOptions.CONFIRM_CHANGES);
        updatePeriod(currentPeriod._id, copy)
    }


    const handleClick = ()=> {
                        addRegisters([...currentPeriod?.registers, { name: '', initialTime: '', finalTime: '', resumeTime: '', status: '', diners: 1 }]);
                        console.log(currentPeriod.registers)
                    }

    useEffect(() => {
        getCurrentPeriod();
        if(!selectedRegister){
          setSelectedRegister(newRegister);  
        } 
        console.log(currentPeriod) ;
    }, [updatePeriod]);
    return (
       <div>
           <header className={styles.header}>
            <div className={styles.addRegister}>
                <button onClick={()=> setShowAll(!showAll)}>{showAll ? "Mostrar solo completos" : "Mostrar todos"}</button>
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
                {currentPeriod?.registers?.map((register, index) => {
                    if(register.status !== "complete" || showAll){
                        return (
                            < li key={index}>
                                <TableStateManager setSelectedTable={(table)=> {
                                    setSelectedRegister(register);
                                    setSelectedIndex(index);
                                    setModalOption(ModalOptions.TABLES_LAYOUT);
                                }} register={register} registerArray={currentPeriod.registers} tables={tablesArray} addAction={(data)=> {addRegisters(data)}} index={index}/>
                            </li>   
                            )
                        }
                        return null;
                })}
                    <button onClick={handleClick} className={styles.addButton}><img src="/add-icon.svg" alt="" />Añadir nuevo registro</button>
                </ul>
            {
                modalOption === ModalOptions.TABLES_LAYOUT && <TablesLayout selectedRegister={selectedRegister} actionType={handleUpdateAssigTable} setSelectedRegister={setSelectedRegister} selectedTable={selectedTable} setSelectedTable={(table)=> {setSelectedTable(table)}} tablesArray={tablesArray} selectedIndex={selectedIndex} onClose={()=> {
                    setModalOption(ModalOptions.INITIAL_STATE);
                    setSelectedTable(null);
                    setSelectedRegister(null);
                }} />
            }
             {
                    modalOption === ModalOptions.CONFIRM_CHANGES && <ConfirmChangesModal loading={isLoading} errors={errors} isOpen={true} onClose={()=> setModalOption(ModalOptions.INITIAL_STATE)} actionType={getCurrentPeriod}>Cambios guardados</ConfirmChangesModal>
                  }
        </div>
    );
}
