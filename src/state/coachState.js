import {create} from "zustand";
import axios from "axios";

const useCoachStore = create((set) => ({
    coaches: [],
    token: localStorage.getItem("token"),
    baseURL: process.env.REACT_APP_BASE_URL,
    signInUrl: process.env.REACT_APP_SIGN_IN_URL,
    fetchCoaches: async () => {
        try {
            const response = await axios.get(useCoachStore.getState().baseURL + "/coaches", {
                headers: {
                    "Authorization": "Bearer " + useCoachStore.getState().token,
                },
            });
            set({ coaches: response.data });
        } catch (error) {
            console.error("Error fetching coaches", error);
        }
    },
    addCoach: async (coach) => {
        try {
            const response = await axios.post(`${useCoachStore.getState().baseURL}/coaches`, coach, {
                headers: {
                    "Authorization": "Bearer " + useCoachStore.getState().token,
                },
            });
            set((state) => ({ coaches: [...state.coaches, response.data] }));
        } catch (error) {
            console.error("Error adding coach", error);
        }
    },
    updateCoach: async (coach) => {
        try {
            const response = await axios.put(`${useCoachStore.getState().baseURL}/coaches/${coach.id}`, coach, {
                headers: {
                    "Authorization": "Bearer " + useCoachStore.getState().token,
                },
            });
            set((state) => ({
                coaches: state.coaches.map((e) => (e.id === coach.id ? response.data : e)),
            }));
        } catch (error) {
            console.error("Error updating coach", error);
        }
    },
    deleteCoach: async (id) => {
        try {
            await axios.delete(`${useCoachStore.getState().baseURL}/coaches/${id}`, {
                headers: {
                    "Authorization": "Bearer " + useCoachStore.getState().token,
                },
            });
            set((state) => ({ coaches: state.coaches.filter((e) => e.id !== id) }));
        } catch (error) {
            console.error("Error deleting coach", error);
        }
    },
    searchCoaches: async (search) => {
        try {
            const response = await axios.get(useCoachStore.getState().baseURL + `/coaches/search/${search}`, {
                headers: {
                    "Authorization": "Bearer " + useCoachStore.getState().token,
                },
            });
            set({ coaches: response.data });
        } catch (error) {
            console.error("Error searching coaches", error);
        }
    }
}))