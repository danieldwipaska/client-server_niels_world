function researchBarChart() {
  const labels = ['NodeJS', 'ExpressJS', 'Redis', 'EJS', 'Bootstrap', 'PostgreSQL', 'MongoDB'];
  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: 'Framework Skill',
        data: [90, 88, 30, 50, 80, 40, 75],
        fill: false,
        backgroundColor: ['rgba(255, 95, 110, 0.6)', 'rgba(255, 95, 110, 0.6)', 'rgba(255, 95, 110, 0.6)', 'rgba(255, 95, 110, 0.6)', 'rgba(255, 95, 110, 0.6)'],
        borderColor: ['rgb(255, 95, 110)', 'rgb(255, 95, 110)', 'rgb(255, 95, 110)', 'rgb(255, 95, 110)', 'rgb(255, 95, 110)'],
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
  const myChart2 = new Chart(document.getElementById('myChart2'), config);
}

function programmingBarChart() {
  const labels = ['Javascript', 'Matlab', 'Embedded System'];
  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: 'Programming Skill',
        data: [85, 45, 55],
        fill: false,
        backgroundColor: ['rgba(255, 159, 80, 0.6)', 'rgba(255, 159, 80, 0.6)', 'rgba(255, 159, 80, 0.6)'],
        borderColor: ['rgb(255, 159, 80)', 'rgb(255, 159, 80)', 'rgb(255, 159, 64)'],
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
  const myChart3 = new Chart(document.getElementById('myChart3'), config);
}

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

researchBarChart();
programmingBarChart();
langskillBarChart();
