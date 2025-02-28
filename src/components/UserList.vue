<template>
  <div class="mt-6">
    <h3 class="text-lg font-medium">Users</h3>
    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in users" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ user.username }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.fullName }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.email || 'N/A' }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button
                @click="$emit('edit', user)"
                class="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              Edit
            </button>
            <button
                @click="$emit('delete', user.id)"
                class="text-red-600 hover:text-red-900 mr-2"
            >
              Delete
            </button>
            <button
                v-if="user.roles?.includes('DISABLED')"
                @click="$emit('enable', user.id)"
                class="text-green-600 hover:text-green-900 mr-2"
            >
              Enable
            </button>
            <button
                v-else
                @click="$emit('disable', user.id)"
                class="text-yellow-600 hover:text-yellow-900"
            >
              Disable
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserResponse } from '../interfaces/user';

defineProps<{
  users: UserResponse[];
}>();

defineEmits<{
  (e: 'edit', user: UserResponse): void;
  (e: 'delete', id: string): void;
  (e: 'enable', id: string): void;
  (e: 'disable', id: string): void;
}>();
</script>