import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllUsers } from '../api/users';
import type { UserResponse } from '../interfaces/user';

export const useUserStore = defineStore('user', () => {
    const users = ref<UserResponse[]>([]);

    async function fetchUsers() {
        try {
            users.value = await getAllUsers();
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }

    return { users, fetchUsers };
});