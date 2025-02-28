<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Register for Mobile Banking</h2>
      </div>
      <UserForm isRegister @submit="handleRegister" />
      <div class="text-sm text-center">
        <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
          Already have an account? Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import UserForm from '../components/UserForm.vue';
import type { UserRequest, UserUpdateRequest } from '../interfaces/user';

const authStore = useAuthStore();
const router = useRouter();

async function handleRegister(user: UserRequest | UserUpdateRequest) {
  try {
    if ('username' in user) {
      // Ensure it's a registration request
      await authStore.registerUser(user);
      if (authStore.isAuthenticated) {
        router.push('/');
      }
    } else {
      throw new Error('Invalid user data for registration.');
    }
  } catch (error) {
    alert('Registration failed. Please try again.');
  }
}

</script>