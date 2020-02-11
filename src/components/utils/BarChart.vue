<script>
    import { Bar } from 'vue-chartjs'

    export default {
        extends: Bar,
        data: () => ({
            chartdata: {
                labels: ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7", "Aug 8", "Aug 9"],
                datasets: [
                    {
                        label: "Participant Registered",
                        backgroundColor: "#81D4FA",
                        data: [18,25,30,23,18,25,80,45,60]
                    }, {
                        label: "Screenings completed",
                        backgroundColor: "#81C784",
                        data: [12,21,22,11,12,25,45,33,45]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }),

        mounted () {
            this.renderChart(this.chartdata, this.options)
        }
    }
</script>
