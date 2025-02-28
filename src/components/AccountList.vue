<template>
  <div class="mt-6">
    <h3 class="text-lg font-medium">Accounts</h3>
    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="account in accounts" :key="account.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ account.accountNumber }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ account.accountName }}</td>
          <td class="px-6 py-4 whitespace-nowrap">${{ account.accountBalance.toFixed(2) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ account.accountType }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AccountResponse } from '../interfaces/account';

defineProps<{
  accounts: AccountResponse[];
}>();
</script>vvvvv