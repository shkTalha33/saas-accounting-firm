/* eslint-disable array-bracket-newline */
/* eslint-disable quote-props */
/* eslint-disable prefer-template */
/* eslint-disable semi */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import Chart from 'react-apexcharts';

const StatisticsChart = () => {
    const options = {
        chart: {
            width: '100vw',
            type: 'line',
            stacked: false
        },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '16px',
            }
        },
        // stroke: {
        //     curve: 'straight',
        // },
        // markers: {
        //     size: 5,
        //     strokeColors: '#eb2222',
        //     backgroundColor: '#eb2222',
        //     shape: "circle",
        //     color: '#eb2222',
        //     radius: 2,
        //     offsetX: 0,
        //     offsetY: 0,
        //     hover: {
        //         size: 6,
        //         sizeOffset: 3
        //     }
        // },
        colors: ['#eb2222'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                gradientToColors: ['linear-gradient(180deg, #eb2222 50%, rgba(39, 49, 66, 0.0293652) 88.92%)'],
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [0, 100]
            },
            inverseColors: false,
            shadow: {
                enabled: false,
                color: '#eb2222',
                opacity: 1,
                offsetX: 0,
                offsetY: 0
            },
            padding: {
                top: 10,
                bottom: 10
            },
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#000',
                },
            },
            axisBorder: {
                show: true,
                color: '#08E395',
                height: 4
            },
        },
        yaxis: {
            tickAmount: 5,
            labels: {
                style: {
                    colors: '#000',
                },
                formatter: function (val) {
                    if (val >= 1000) {
                        return (val / 1000).toFixed(1) + 'k';
                    }
                    return val;
                }
            }
        },
        responsive: [{
            breakpoint: 500,
            options: {
                chart: {
                    height: 250
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            show: false,
        },
    }

    const data = [
        { "x": "Jan", "y": 0 },
        { "x": "Feb", "y": 0 },
        { "x": "Mar", "y": 0 },
        { "x": "Apr", "y": 0 },
        { "x": "May", "y": 0 },
        { "x": "Jun", "y": 0 },
        { "x": "Jul", "y": 0 },
        { "x": "Aug", "y": 0 },
        { "x": "Sep", "y": 0 },
        { "x": "Oct", "y": 0 },
        { "x": "Nov", "y": 0 },
        { "x": "Dec", "y": 0 },
        { "x": "Vex", "y": 0 },
        { "x": "Dea", "y": 0 },
        { "x": "Dew", "y": 0 },
    ]
    const seriesArea = [{ data: data }]

    return (
        <div className='bg_white rounded-2 w-full shadow-sm p-3'>
            <h6 className="text_dark plusJakara_semibold">
                Transactions Report
            </h6>
            <div style={{ height: '350px' }}>
                <Chart options={options} series={seriesArea} type="area" height={350} />
            </div>
        </div>
    )
}

export default StatisticsChart
