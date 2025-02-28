<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-semibold text-gray-900">Users</h1>
    <div class="mt-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium">All Users</h3>
        <div v-if="message" class="mt-2 text-sm" :class="messageClass">
          {{ message }}
        </div>
        <div class="mt-4 overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in userStore.users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.username }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.fullName }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                  <span
                      :class="[
                        user.roles?.includes('DISABLED')
                          ? 'text-red-600'
                          : 'text-green-600',
                      ]"
                  >
                    {{ user.roles?.includes('DISABLED') ? 'Disabled' : 'Enabled' }}
                  </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap space-x-2">
                <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button @click="removeUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
                <button
                    v-if="user.roles?.includes('DISABLED')"
                    @click="activateUser(user.id)"
                    class="text-green-600 hover:text-green-900 disabled:opacity-50"
                    :disabled="isLoading"
                >
                  Enable
                </button>
                <button
                    v-else
                    @click="deactivateUser(user.id)"
                    class="text-yellow-600 hover:text-yellow-900 disabled:opacity-50"
                    :disabled="isLoading"
                >
                  Disable
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="selectedUser" class="mt-6 bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium">Edit User</h3>
        <UserForm :initial-user="selectedUser" @submit="updateSelectedUser" @cancel="cancelEdit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { updateUser as apiUpdateUser, deleteUser as apiDeleteUser, enableUser as apiEnableUser, disableUser as apiDisableUser } from '../api/users';
import type { UserResponse, UserUpdateRequest } from '../interfaces/user';
import UserForm from '../components/UserForm.vue';

const userStore = useUserStore();
const selectedUser = ref<UserResponse | null>(null);
const isLoading = ref(false); // Track loading state
const message = ref<string | null>(null); // Feedback message
const messageClass = ref(''); // CSS class for message

onMounted(() => {
  userStore.fetchUsers();
});

function editUser(user: UserResponse) {
  selectedUser.value = { ...user };
}

async function updateSelectedUser(userData: UserUpdateRequest) {
  if (!selectedUser.value?.id) return;
  console.log('Updating user with ID:', selectedUser.value.id);
  console.log('User data to send:', JSON.stringify(userData, null, 2));
  try {
    await apiUpdateUser(selectedUser.value.id, userData);
    console.log('Update successful');
    userStore.fetchUsers();
    selectedUser.value = null;
    showMessage('User updated successfully', 'text-green-600');
  } catch (error) {
    console.error('Update failed in frontend:', error);
    showMessage('Failed to update user', 'text-red-600');
  }
}

function cancelEdit() {
  selectedUser.value = null;
}

async function removeUser(id: string) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await apiDeleteUser(id);
      userStore.fetchUsers();
      showMessage('User deleted successfully', 'text-green-600');
    } catch (error) {
      console.error('Delete failed:', error);
      showMessage('Failed to delete user', 'text-red-600');
    }
  }
}

async function activateUser(id: string) {
  isLoading.value = true;
  try {
    await apiEnableUser(id);
    userStore.fetchUsers();
    showMessage('User enabled successfully', 'text-green-600');
  } catch (error) {
    console.error('Enable failed:', error);
    showMessage('Failed to enable user', 'text-red-600');
  } finally {
    isLoading.value = false;
  }
}

async function deactivateUser(id: string) {
  isLoading.value = true;
  try {
    await apiDisableUser(id);
    userStore.fetchUsers();
    showMessage('User disabled successfully', 'text-green-600');
  } catch (error) {
    console.error('Disable failed:', error);
    showMessage('Failed to disable user', 'text-red-600');
  } finally {
    isLoading.value = false;
  }
}

function showMessage(text: string, cssClass: string) {
  message.value = text;
  messageClass.value = cssClass;
  setTimeout(() => {
    message.value = null;
    messageClass.value = '';
  }, 3000); // Clear message after 3 seconds
}
</script>