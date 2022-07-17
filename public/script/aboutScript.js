function langskillBarChart() {
  const labels = ['Bahasa Indonesia', 'English'];
  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: 'Berbicara',
        data: [95, 60],
        fill: false,
        backgroundColor: ['rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgb(255, 99, 132)'],
        borderWidth: 1,
      },
      {
        axis: '',
        label: 'Menulis',
        data: [90, 65],
        fill: false,
        backgroundColor: ['rgba(255, 159, 64, 0.6)'],
        borderColor: ['rgb(255, 159, 64)'],
        borderWidth: 1,
      },
    ],
  };

  // CONFIG
  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          min: 0,
          max: 100,
        },
      },
    },
  };

  // RENDER
  const myChart1 = new Chart(document.getElementById('myChart1'), config);
}

langskillBarChart();
