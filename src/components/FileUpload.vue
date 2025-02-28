<template>
  <div class="space-y-4">
    <input
        type="file"
        multiple
        @change="handleFileChange"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
    />
    <button
        @click="uploadFiles"
        :disabled="!files.length"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
    >
      Upload
    </button>
    <div v-if="uploadedFiles.length" class="mt-4">
      <h3 class="text-lg font-medium">Uploaded Files:</h3>
      <ul class="list-disc pl-5">
        <li v-for="file in uploadedFiles" :key="file.filename" class="flex items-center justify-between py-2">
          <span>{{ file.filename }}</span>
          <button @click="removeFile(file.filename)" class="text-red-600 hover:text-red-800">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uploadMultipleFiles, deleteFile as apiDeleteFile } from '../api/files'; // Rename imported deleteFile
import type { FileResponse } from '../interfaces/file';

const files = ref<File[]>([]);
const uploadedFiles = ref<FileResponse[]>([]);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    files.value = Array.from(target.files);
  }
}

async function uploadFiles() {
  try {
    const response = await uploadMultipleFiles(files.value);
    uploadedFiles.value = [...uploadedFiles.value, ...response];
    files.value = [];
  } catch (error) {
    console.error('File upload failed:', error);
  }
}

async function removeFile(fileName: string) { // Rename local function
  try {
    await apiDeleteFile(fileName);
    uploadedFiles.value = uploadedFiles.value.filter((f) => f.filename !== fileName);
  } catch (error) {
    console.error('File deletion failed:', error);
  }
}
</script>