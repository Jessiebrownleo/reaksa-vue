<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
<!--            <div class="flex-shrink-0 flex items-center">-->
<!--              <img class="h-8 w-auto" src="./assets/logo.png" alt="Mobile Banking" />-->
<!--            </div>-->
            <div v-if="authStore.isAuthenticated" class="ml-6 flex space-x-8">
              <router-link
                  to="/dashboard"
                  class="border-b-2 border-transparent px-1 pt-1 pb-4 text-sm font-medium text-gray-500 hover:border-indigo-500 hover:text-gray-700"
              >
                Dashboard
              </router-link>
              <router-link
                  to="/users"
                  class="border-b-2 border-transparent px-1 pt-1 pb-4 text-sm font-medium text-gray-500 hover:border-indigo-500 hover:text-gray-700"
              >
                Users
              </router-link>
              <router-link
                  to="/accounts"
                  class="border-b-2 border-transparent px-1 pt-1 pb-4 text-sm font-medium text-gray-500 hover:border-indigo-500 hover:text-gray-700"
              >
                Accounts
              </router-link>
            </div>
          </div>
          <div v-if="authStore.isAuthenticated" class="flex items-center">
            <span class="text-sm text-gray-700 mr-4">{{ authStore.currentUser?.username }}</span>
            <button
                @click="authStore.logout"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

if (!authStore.isAuthenticated && router.currentRoute.value.path !== '/' && router.currentRoute.value.path !== '/register') {
  router.push('/');
}
</script>