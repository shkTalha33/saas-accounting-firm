import React from 'react';
import Chart from 'react-apexcharts';

const OrderChart = ({ graph }) => {
    const options = {
        chart: { width: '100vw', type: 'line', stacked: false },
        dataLabels: { enabled: false, style: { fontSize: '16px' } },
        colors: ['#eb2222', '#008FFB', '#08E395', "#FFAF1C"],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                gradientToColors: [
                    'linear-gradient(180deg, #eb2222 50%, rgba(39, 49, 66, 0.0293652) 88.92%)',
                    '#008FFB', '#08E395', "#FFAF1C"
                ],
                opacityFrom: 0.7, opacityTo: 0.5, stops: [0, 100]
            },
            inverseColors: false,
            shadow: { enabled: false },
        },
        xaxis: {
            labels: { style: { colors: '#000' } },
            categories: graph?.map(item => item.x) // Set x-axis labels to months from graph
        },
        yaxis: {
            tickAmount: 5,
            labels: {
                style: { colors: '#000' },
                formatter: val => val,
            }
        },
        responsive: [{
            breakpoint: 500,
            options: {
                chart: { height: 250 },
                legend: { show: false }
            }
        }],
        legend: { show: false },
    }

    // Transform graph data for each series
    const data1 = graph?.map(item => ({ x: item?.x, y: item?.rejected }));
    const data2 = graph?.map(item => ({ x: item?.x, y: item?.pending }));
    const data3 = graph?.map(item => ({ x: item?.x, y: item?.complete }));
    const data4 = graph?.map(item => ({ x: item?.x, y: item?.rejected + item?.pending + item?.complete }));

    const seriesArea = [
        { name: 'Cancelled Order', data: data1 },
        { name: 'Pending Order', data: data2 },
        { name: 'Completed Order', data: data3 },
        { name: 'Total Orders', data: data4 },
    ]

    return (
        <div className='bg_white rounded-2 w-full shadow-sm p-3'>
            <h6 className="text_dark plusJakara_semibold">
                Service Order History
            </h6>
            <div style={{ height: '350px' }}>
                <Chart options={options} series={seriesArea} type="area" height={350} />
            </div>
        </div>
    );
}

export default OrderChart;
