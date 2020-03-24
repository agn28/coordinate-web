<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["stats"],
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Careplan Pending",
          backgroundColor: "#81D4FA",
          data: []
        },
        {
          label: "Careplan Completed",
          backgroundColor: "#81C784",
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted() {
    for (let index in this.stats) {
      this.chartdata.labels.push(index);
      this.chartdata.datasets[0].data.push(this.stats[index]["pending"]);
      this.chartdata.datasets[1].data.push(this.stats[index]["completed"]);
    }
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
