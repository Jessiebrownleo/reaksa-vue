<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <div class="mt-6">
      <h2 class="text-lg font-medium">Welcome, {{ authStore.currentUser?.fullName }}</h2>

      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium">Your Accounts</h3>
        <AccountList :accounts="accounts"/>
        <button
            @click="router.push('/accounts')"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Manage Accounts
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useAuthStore} from '../stores/auth';
import {useRouter} from 'vue-router';
import {getAccountsByUserId} from '../api/accounts';
import type {AccountResponse} from '../interfaces/account';
import AccountList from '../components/AccountList.vue';

const authStore = useAuthStore();
const router = useRouter();
const accounts = ref<AccountResponse[]>([]);

onMounted(async () => {
  if (authStore.currentUser?.id) {
    accounts.value = await getAccountsByUserId(authStore.currentUser.id);
  }
});
</script>