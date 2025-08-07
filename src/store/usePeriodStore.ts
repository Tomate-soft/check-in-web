import { CheckInRegister } from '@/app/home/page';
import { getCurrentPeriodService, updatePeriodService } from '@/services/operatingPeriodServices';
import { create } from 'zustand';

interface State {
  isLoading: boolean;
  errors: Error | string | null | boolean;
  period: any;
  getCurrentPeriod: () => Promise<void>;
  addRegisters: (resgisters: CheckInRegister[]) => void;
  updatePeriod: (id: string, body: CheckInRegister[]) => void;
}

export const useOperatingPeriodStore = create<State>((set, get) => ({
  isLoading: false,
  errors: null,
  period: {},
  getCurrentPeriod: async () => {
    set({ isLoading: true });
    try {
      const res = await getCurrentPeriodService();
      const data = res[0];
      console.log(data);
      set({ period: data, isLoading: false, errors: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false, errors: true });
    }
  },
  addRegisters: (registerArray )=> {
    const period = get().period;
    set({period: {...period, registers: registerArray}})
  },
  updatePeriod: async (id, body) => {
    set({ isLoading: true })
    try {
      console.log("aqui es el rolete ")
      console.log(body)
      const res = await updatePeriodService(id, body);
      set({isLoading: false})
    } catch (error) {
      set({isLoading: false, errors: error })
      throw new Error("No se ha podido actualizar el periodo")
      
    } finally {
      set({ isLoading: false})
    }
  }
}));
