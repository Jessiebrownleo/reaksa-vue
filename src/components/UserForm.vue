<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-if="isRegister">
      <label class="block text-sm font-medium text-gray-700">Username</label>
      <input
          v-model="formData.username"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Full Name</label>
      <input
          v-model="formData.fullName"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Gender</label>
      <select
          v-model="formData.gender"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div v-if="isRegister">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
          v-model="formData.email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="isRegister">
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <input
          v-model="formData.password"
          type="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Profile Image</label>
      <input
          v-model="formData.profileImage"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Phone Number</label>
      <input
          v-model="formData.phoneNumber"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">City or Province</label>
      <input
          v-model="formData.cityOrProvince"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Khan or District</label>
      <input
          v-model="formData.khanOrDistrict"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Sangkat or Commune</label>
      <input
          v-model="formData.sangkatOrCommune"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Employee Type</label>
      <input
          v-model="formData.employeeType"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Company Name</label>
      <input
          v-model="formData.companyName"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Main Source of Income</label>
      <input
          v-model="formData.mainSourceOfIncome"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Monthly Income Range</label>
      <input
          v-model="formData.monthlyIncomeRange"
          type="number"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div v-if="!isRegister">
      <label class="block text-sm font-medium text-gray-700">Student Card ID</label>
      <input
          v-model="formData.studentCardId"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div class="flex space-x-4">
      <button
          type="submit"
          class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ isRegister ? 'Register' : 'Save' }}
      </button>
      <button
          v-if="!isRegister"
          @click="$emit('cancel')"
          type="button"
          class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { UserRequest, UserResponse, UserUpdateRequest } from '../interfaces/user';

// Define a combined type for formData that includes all possible fields
interface FormData extends UserUpdateRequest {
  username?: string;
  email?: string;
  password?: string;
}

const props = defineProps<{
  initialUser?: UserResponse | null;
  isRegister?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', user: UserRequest | UserUpdateRequest): void;
  (e: 'cancel'): void;
}>();

const formData = ref<FormData>({
  fullName: '',
  gender: '',
  profileImage: '',
  phoneNumber: '',
  cityOrProvince: '',
  khanOrDistrict: '',
  sangkatOrCommune: '',
  employeeType: '',
  companyName: '',
  mainSourceOfIncome: '',
  monthlyIncomeRange: 0,
  studentCardId: '',
  ...(props.isRegister ? { username: '', email: '', password: '' } : {}),
});

watch(() => props.initialUser, (newUser) => {
  if (newUser && !props.isRegister) {
    formData.value = {
      fullName: newUser.fullName,
      gender: newUser.gender,
      profileImage: newUser.profileImage || '',
      phoneNumber: newUser.phoneNumber || '',
      cityOrProvince: newUser.cityOrProvince || '',
      khanOrDistrict: newUser.khanOrDistrict || '',
      sangkatOrCommune: newUser.sangkatOrCommune || '',
      employeeType: newUser.employeeType || '',
      companyName: newUser.companyName || '',
      mainSourceOfIncome: newUser.mainSourceOfIncome || '',
      monthlyIncomeRange: newUser.monthlyIncomeRange ? Number(newUser.monthlyIncomeRange) : 0,
      studentCardId: newUser.studentCardId || '',
    };
  }
}, { immediate: true });

function handleSubmit() {
  if (props.isRegister) {
    const userRequest: UserRequest = {
      username: formData.value.username || '',
      fullName: formData.value.fullName || '',
      gender: formData.value.gender || '',
      email: formData.value.email,
      password: formData.value.password,
      profileImage: formData.value.profileImage,
      phoneNumber: formData.value.phoneNumber,
      cityOrProvince: formData.value.cityOrProvince,
      khanOrDistrict: formData.value.khanOrDistrict,
      sangkatOrCommune: formData.value.sangkatOrCommune,
      employeeType: formData.value.employeeType,
      companyName: formData.value.companyName,
      mainSourceOfIncome: formData.value.mainSourceOfIncome,
      monthlyIncomeRange: formData.value.monthlyIncomeRange,
      studentCardId: formData.value.studentCardId,
    };
    emit('submit', userRequest);
  } else {
    const userUpdate: UserUpdateRequest = {
      fullName: formData.value.fullName,
      gender: formData.value.gender,
      profileImage: formData.value.profileImage,
      phoneNumber: formData.value.phoneNumber,
      cityOrProvince: formData.value.cityOrProvince,
      khanOrDistrict: formData.value.khanOrDistrict,
      sangkatOrCommune: formData.value.sangkatOrCommune,
      employeeType: formData.value.employeeType,
      companyName: formData.value.companyName,
      mainSourceOfIncome: formData.value.mainSourceOfIncome,
      monthlyIncomeRange: formData.value.monthlyIncomeRange,
      studentCardId: formData.value.studentCardId,
    };
    emit('submit', userUpdate);
  }
}
</script>