"use client";
import TablesGrid from "@/components/tablesGrid/tablesGrid";
import { UseTableStore } from "@/store/useTableStore";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export interface CheckInRegister {
    name: string;
    diners: number;
    initialTime: string;
    finalTime: string;
    resumeTime: string;
    status: string;
}

export default function Home() {
    const router = useRouter();
    const user = useUserStore((state)=>  state.user); 
    const getTables = UseTableStore((state) => state.getTables);
    const tablesArray = UseTableStore((state) => state.tablesArray);
    const [registers, setRegisters] = useState<CheckInRegister[]>([]);

    useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            getTables(); 
        }
    }, []);

    // No renderizar si aún no se decide qué hacer con el usuario
    if (!user) return null;

    return <TablesGrid tablesArray={tablesArray} user={user} registers={registers} setRegisters={setRegisters}/>;
}
