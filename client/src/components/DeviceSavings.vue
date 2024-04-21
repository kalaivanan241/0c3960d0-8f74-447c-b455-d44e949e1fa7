<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import BarChart from "./BarChart.vue"
import SavingDisplay from './SavingDisplay.vue'

const DEVICE_SAVINGS_QUERY = gql`
  query DeviceSavingsQuery($deviceId: Int, $from: DateTime!, $to: DateTime!) {
  data: devicesSavingsData(deviceId: $deviceId, from: $from, to: $to) {
    statistics {
      total {
        carbonSaved
        fuelSaved
      }
    }
    data {
      carbonSaved
      date
      fuelSaved
    }
  }
}
`

export default {
  name: 'DeviceSavings',
  components: { BarChart, SavingDisplay },
  props: {
    deviceId: Number,
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { result, loading, error } = useQuery(DEVICE_SAVINGS_QUERY, props);
    return {
      result,
      loading,
      error
    }
  }
}

</script>

<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else>
    <div class="container grid grid-cols-1 sm:grid-cols-2 justify-items-center my-3">
      <SavingDisplay :savings="result.data.statistics.total.carbonSaved" label="Carbon Saved" />
      <SavingDisplay :savings="result.data.statistics.total.fuelSaved" label="Fuel Saved" />
    </div>
    <BarChart v-show="result" :data="result.data" />
  </div>
</template>



<style scoped></style>