import {create} from "zustand";
import axios from "axios";

const useSubscriptionStore = create((set) => ({
    subscriptions: [],
    token: localStorage.getItem("token"),
    baseURL: process.env.REACT_APP_BASE_URL,
    signInUrl: process.env.REACT_APP_SIGN_IN_URL,
    fetchSubscriptions: async () => {
        try {
            const response = await axios.get(useSubscriptionStore.getState().baseURL + "/subscriptions", {
                headers: {
                    Authorization: "Bearer " + useSubscriptionStore.getState().token,
                },
            });
            set({ subscriptions: response.data });
        } catch (error) {
            console.error("Error fetching subscriptions", error);
        }
    },
    addSubscription: async (subscription) => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/subscription", subscription, {
                headers: {
                    "Authorization": "Bearer " + useSubscriptionStore.getState().token,
                },
            });
            set((state) => ({ subscriptions: [...state.subscriptions, response.data] }));
        } catch (error) {
            console.error("Error adding subscription", error);
        }
    },
    updateSubscription: async (subscription) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/subscription/${subscription.id}`, subscription, {
                headers: {
                    "Authorization": "Bearer " + useSubscriptionStore.getState().token,
                },
            });
            set((state) => ({
                subscriptions: state.subscriptions.map((s) => (s.id === subscription.id ? response.data : s)),
            }));
        } catch (error) {
            console.error("Error updating subscription", error);
        }
    },
    deleteSubscription: async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/subscription/${id}`, {
                headers: {
                    "Authorization": "Bearer " + useSubscriptionStore.getState().token,
                },
            });
            set((state) => ({ subscriptions: state.subscriptions.filter((s) => s.id !== id) }));
        } catch (error) {
            console.error("Error deleting subscription", error);
        }
    }
}))

export default useSubscriptionStore;