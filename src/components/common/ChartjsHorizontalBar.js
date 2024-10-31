// ** Reactstrap Imports
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register all necessary Chart.js components
Chart.register(...registerables);

const ChartjsHorizontalBarChart = ({ warning, gridLineColor, labelColor, info }) => {
  // ** Chart Options
  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    elements: {
      bar: {
        borderRadius: {
          topRight: 15,
          bottomRight: 15
        }
      }
    },
    layout: {
      padding: { top: -4 }
    },
    scales: {
      x: {
        grid: {
          drawTicks: false,
          color: gridLineColor,
          borderColor: 'transparent'
        },
        ticks: { color: labelColor }
      },
      y: {
        grid: {
          display: false,
          borderColor: gridLineColor
        },
        ticks: { color: labelColor }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: { color: labelColor }
      }
    }
  };

  // ** Chart Data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      // {
      //   maxBarThickness: 15,
      //   label: 'All Orders',
      //   backgroundColor: warning,
      //   borderColor: 'transparent',
      //   data: [710, 350, 580, 460, 120, 200, 400, 350, 580, 460, 120, 200, 400]
      // },
      {
        maxBarThickness: 15,
        backgroundColor: info,
        label: 'Orders in Progress',
        borderColor: 'transparent',
        data: []
      }
    ]
  };

  return (
    <div className='bg_white rounded-2 w-full shadow-sm p-3'>
      <h6 className="text_dark plusJakara_semibold">
        Deposit & Withdraw Report
      </h6>
      <div style={{ height: '350px' }}>
        <Bar data={data} options={options} height={400} />
      </div>
    </div>
  );
};

export default ChartjsHorizontalBarChart;
