<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin);

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        data: { type: Object, required: true }
    },
    setup({ data }) {
        const { labels, data1, data2 } = data?.data.reduce((acc, d) => {
            acc.labels.push(d.date),
                acc.data1.push(d.carbonSaved)
            acc.data2.push(d.fuelSaved)
            return acc;
        }, { labels: [], data1: [], data2: [] });


        return {
            chartData: {
                labels,
                datasets: [
                    {
                        label: 'Carbon Saved',
                        backgroundColor: '#f87979',
                        data: data1,
                    },
                    {
                        label: 'Fuel Saved',
                        backgroundColor: '#666',
                        data: data2,
                    },
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                        }
                    }
                }
            }
        }
    }
}
</script>