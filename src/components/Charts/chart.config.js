const datasetObject = {
  data: [65, 59, 80, 81, 56, 55, 40],
  fill: false,
  borderColor: 'rgb(75, 192, 192)',
  tension: 0.1,
}

export const sampleChartData = (tempResults) => {
  const labels = tempResults.map(res => res.date)

  return {
    labels,
    datasets: [
      {
        ...datasetObject,
        data: tempResults.map(res => res.temp)
      }
    ]
  }
}
