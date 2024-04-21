<script setup>
import { ref } from 'vue';
import DeviceSavings from './components/DeviceSavings.vue';
import Statistics from './components/Statistics.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

let deviceId = ref(1);
let from = ref("2023-01-01T00:00:00.000Z");
let to = ref("2023-01-01T24:00:00.000Z");

const GET_DEVICES = gql`
  query getDevices
  {
    devices:getDevices {
      id
      name
    }
  }
`
const { result, error, loading } = useQuery(GET_DEVICES)


</script>

<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else class="container mx-auto my-8 md:px-4 flex flex-col space-y-4">
    <div class="b-3 rounded-md shadow-lg py-2 px-4">
      <div class="max-w-[500px] mx-auto">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Device</label>
        <select v-model.number="deviceId"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

          <option v-for="item in result.devices" :value="item.id" :key="item.id">
            {{ item.name }}
          </option>

        </select>
      </div>
      <div>
        <Statistics :deviceId="deviceId" />
      </div>
    </div>
    <div class="b-3 rounded-md shadow-lg py-2 px-4">
      <div style="display: flex; justify-content: space-around;">
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">From
          </label>
          <input v-model.lazy="from" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required />
        </div>
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">To
          </label>
          <input v-model.lazy="to" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required />
        </div>

      </div>
      <DeviceSavings :deviceId="deviceId" :from="from" :to="to" />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #030303;
}

body {
  margin: 0;
  background-color: #fafafa;
}
</style>