import {create} from "zustand";
import axios from "axios";

const useMemberStore = create((set) => ({
    members: [],
    token: localStorage.getItem("token"),
    baseURL: process.env.REACT_APP_BASE_URL,
    signInUrl: process.env.REACT_APP_SIGN_IN_URL,
    fetchMembers: async () => {
        try {
            const response = await axios.get(useMemberStore.getState().baseURL + "/members", {
                headers: {
                    Authorization: "Bearer " + useMemberStore.getState().token,
                },
            });
            set({ members: response.data });
        } catch (error) {
            console.error("Error fetching members", error);
        }
    },
    addMember: async (member) => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/member", member, {
                headers: {
                    "Authorization": "Bearer " + useMemberStore.getState().token,
                },
            });
            set((state) => ({ members: [...state.members, response.data] }));
        } catch (error) {
            console.error("Error adding member", error);
        }
    },
    updateMember: async (member) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/member/${member.id}`, member, {
                headers: {
                    "Authorization": "Bearer " + useMemberStore.getState().token,
                },
            });
            set((state) => ({
                members: state.members.map((m) => (m.id === member.id ? response.data : m)),
            }));
        } catch (error) {
            console.error("Error updating member", error);
        }
    },
    deleteMember: async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/member/${id}`, {
                headers: {
                    "Authorization": "Bearer " + useMemberStore.getState().token,
                },
            });
            set((state) => ({ members: state.members.filter((m) => m.id !== id) }));
        } catch (error) {
            console.error("Error deleting member", error);
        }
    }
}))

export default useMemberStore;