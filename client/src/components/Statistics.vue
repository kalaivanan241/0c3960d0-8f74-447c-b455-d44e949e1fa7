<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable';
import { getValueTonnes } from "../utils/common"
import SavingDisplay from './SavingDisplay.vue';

const STATISTICS_QUERY = gql`
  query Statistics($deviceId: Int) {
    savingStatistics(deviceId: $deviceId) {
    total {
      carbonSaved
      fuelSaved
    }
    monthlyAverage {
      carbonSaved
      fuelSaved
    }
  }
  }
`
export default {
  name: 'Statistics',
  props: {
    deviceId: Number,
  },
  components: { SavingDisplay },
  setup(props) {
    const { result, loading, error } = useQuery(STATISTICS_QUERY, props);
    return {
      result,
      loading,
      error
    }
  }
}
</script>

<template>
  <div class="statistics">
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <div class="flex flex-col space-y-4 my-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 justify-items-center">
          <SavingDisplay :savings="result.savingStatistics.total.carbonSaved" label="Total Carbon Saved" />
          <SavingDisplay :savings="result.savingStatistics.total.fuelSaved" label="Total Fuel saved" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 justify-items-center">
          <SavingDisplay :savings="result.savingStatistics.monthlyAverage.carbonSaved" label="Monthly carbon saved" />
          <SavingDisplay :savings="result.savingStatistics.monthlyAverage.fuelSaved" label="Monthly Fuel saved" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>