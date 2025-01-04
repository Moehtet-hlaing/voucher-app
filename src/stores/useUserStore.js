import { remove } from "lodash";
import { create } from "zustand";


const useUserStore = create((set) => ({
    user: {},
    setUser: (user) => set({ user: user }),
    removeUser: () => set({ user: {} }),
}));

export default useUserStore;