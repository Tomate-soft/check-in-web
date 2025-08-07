import { enableTableService } from '@/services/assignTable';
import { create } from 'zustand';
type User = {
  _id: string;
  name: string;
  lastName: string;
  employeeNumber: string;
  role: {
    role: {
      name: string;
    };
  };
  // agrega más campos si tu modelo tiene más
}

export interface Table {
  _id: string;
  tableNum: string;
  status: string;
  user: User;
  // agrega más campos si tu modelo tiene más
}

interface State {
  isLoading: boolean;
  errors: Error | string | null | boolean;
  tablesArray: Table[];
  getTables: () => Promise<void>;
  openTable: (tableId: string, body: { diners: number }) => Promise<void>;
}

export const UseTableStore = create<State>((set) => ({
  isLoading: false,
  errors: null,
  tablesArray: [],
  getTables: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("https://internal.api.tomatesoft.com/tables", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Error al obtener las mesas');
      }

      const data: Table[] = await res.json();
      console.log(data);
      set({ tablesArray: data, isLoading: false, errors: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false, errors: true });
    }
  },
  openTable: async (tableId: string, body) => {
    set({ isLoading: true });
    try {
      const res = await enableTableService(tableId, body);
      set({ isLoading: false });
      console.log('Mesa abierta correctamente');
      console.log(res);
      // const updatedTable: Table = await res.json();
      // set((state) => ({
      //   tablesArray: state.tablesArray.map((table) =>
      //     table._id === updatedTable._id ? updatedTable : table
      //   ),
      //   isLoading: false,
      //   errors: false,
      // }));
    } catch (error) {
      console.error(error);
      set({ isLoading: false, errors: true });
    }
  },

}));
//     updateTables: async (arg, userId) => {
//       set({ isLoading: true })
//       try {
//         const res = await updateTablesService(arg, userId)
//         if (!res) {
//           set({ isLoading: false, errors: true })
//         }
//         set({ isLoading: false, errors: false })
//         return res
//       } catch (error) {
//         set({ isLoading: false, errors: true })
//       }
//     },

//     resetTables: async () => {
//       set({ isLoading: true })
//       try {
//         const [res, response] = await Promise.all([
//           resetTablesService(),
//           resetTablesInUsersService()
//         ])
//         if (!res) {
//           set({ isLoading: false, errors: true })
//         }
//         if (!response) {
//           set({ isLoading: false, errors: true })
//         }
//         set({ isLoading: false, errors: false })
//       } catch (error) {
//         set({ isLoading: false, errors: true })
//       }
//     },
//     joinTables: async (body) => {
//       set({ isLoading: true })
//       try {
//         const res = await joinTablesService(body)
//         if (!res) {
//           set({ isLoading: false, errors: true })
//         }
//         set({ isLoading: false, errors: false })
//         return res
//       } catch (error) {
//         set({ isLoading: false, errors: true })
//       }
//     },
//     splitTables: async (id) => {
//       set({ isLoading: true })
//       try {
//         const res = await splitTablesService(id)
//         if (!res) {
//           set({ isLoading: false, errors: true })
//         }
//         set({ isLoading: false, errors: false })
//         return res
//       } catch (error) {
//         set({ isLoading: false, errors: true })
//       }
//     },
//     enableTable: async (id, body) => {
//       set({ isLoading: true })
//       try {
//         const res = await enableTableService(id, body)
//         if (!res) {
//           set({ isLoading: false, errors: true })
//         }
//         set({ isLoading: false, errors: false })
//         return res
//       } catch (error) {
//         set({ isLoading: false, errors: true })
//       }
//     },
//     changeTableStatus: async (body) => {
//       set({ isLoading: true })
//       try {
//         const res = await changeTableStatusService(body)
//         if (!res) {
//           set({ isLoading: false, errors: true })
//         }
//         set({ isLoading: false, errors: false })
//         return res
//       } catch (error) {
//         set({ isLoading: false, errors: true })
//       }
//     }
//   }
// })