import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardBody } from 'reactstrap';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartjsLineChart = ({ labelColor, gridLineColor, warningColorShade, lineChartDanger, lineChartPrimary }) => {
  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      },
      y: {
        min: 0,
        max: 400,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'start',
        position: 'top',
        labels: {
          boxWidth: 10,
          marginBottom: 25,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  };

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        data: [150, 125, 105, 330, 215, 195, 140, 160, 230, 300, 220, 170],
        fill: false,
        tension: 0.5,
        label: 'Service Provider',
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        pointHoverBorderWidth: 5,
        borderColor: lineChartPrimary,
        pointBorderColor: 'transparent',
        backgroundColor: lineChartPrimary,
        pointHoverBackgroundColor: lineChartPrimary
      },
      {
        data: [80, 299, 182, 190, 115, 115, 174, 275, 130, 155, 125, 90],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Customers',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        pointHoverBorderWidth: 5,
        borderColor: warningColorShade,
        backgroundColor: warningColorShade,
        pointBorderColor: warningColorShade,
        pointHoverBackgroundColor: warningColorShade
      }
    ]
  };

  const plugins = [
    {
      beforeInit(chart) {
        if (chart.legend) {
          const originalAfterFit = chart.legend.afterFit;
          chart.legend.afterFit = function () {
            if (originalAfterFit) originalAfterFit.call(this);
            this.height += 20;
          };
        }
      }
    }
  ];

  return (
    <Card className='p-3'>
      <h4>
        Sales Summary
      </h4>
      <CardBody className={'pt-3'}>
        <div style={{ height: '400px' }}>
          <Line data={data} options={options} height={450} plugins={plugins} />
        </div>
      </CardBody>
    </Card >
  );
};

export default ChartjsLineChart;
