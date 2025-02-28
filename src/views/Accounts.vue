<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-semibold text-gray-900">Accounts</h1>
    <div class="mt-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium">Create New Account</h3>
        <form @submit.prevent="createNewAccount" class="space-y-6 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Account Number</label>
            <input
                v-model="newAccount.accountNumber"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Account Name</label>
            <input
                v-model="newAccount.accountName"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Initial Balance</label>
            <input
                v-model="newAccount.accountBalance"
                type="number"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Account Type</label>
            <select
                v-model="newAccount.accountType"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="SAVINGS">Savings</option>
              <option value="PAYROLLS">Payrolls</option>
              <option value="CARD">Card</option>
            </select>
          </div>
          <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </form>
      </div>

      <div class="mt-6 bg-white shadow rounded-lg p-6">
        <AccountList :accounts="accounts" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { createAccount, getAllAccounts } from '../api/accounts'; // Removed updateAccount
import type { AccountRequest, AccountResponse } from '../interfaces/account';
import AccountList from '../components/AccountList.vue';

const authStore = useAuthStore();
const accounts = ref<AccountResponse[]>([]);
const newAccount = ref<AccountRequest>({
  accountNumber: '',
  accountName: '',
  accountBalance: 0,
  accountType: '',
  userId: authStore.currentUser?.id || '',
});

onMounted(async () => {
  accounts.value = await getAllAccounts();
});

async function createNewAccount() {
  try {
    newAccount.value.userId = authStore.currentUser?.id || '';
    await createAccount(newAccount.value);
    accounts.value = await getAllAccounts();
    newAccount.value = {
      accountNumber: '',
      accountName: '',
      accountBalance: 0,
      accountType: '',
      userId: authStore.currentUser?.id || ''
    };
  } catch (error) {
    console.error('Account creation failed:', error);
  }
}
</script>