// "use client";

// import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts';

// const LineChart = ({ data, title, yAxisLabel }) => {
//     const chartRef = useRef(null);

//     useEffect(() => {
//         const chart = echarts.init(chartRef.current);

//         const option = {
//             tooltip: {
//                 trigger: 'axis'
//             },
//             xAxis: {
//                 type: 'category',
//                 data: data.map(item => item.time)
//             },
//             yAxis: {
//                 type: 'value',
//                 name: yAxisLabel
//             },
//             series: [{
//                 data: data.map(item => item.value),
//                 type: 'line',
//                 smooth: true,
//                 itemStyle: {
//                     color: '#10B981'
//                 }
//             }]
//         };

//         chart.setOption(option);

//         return () => chart.dispose();
//     }, [data]);

//     return <div ref={chartRef} className="w-full h-[300px]" />;
// };

// export default LineChart;



"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = ({ data, title, yAxisLabel }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data.map(series => series.name),
                top: 0
            },
            grid: {
                top: 30,
                right: 20,
                bottom: 20,
                left: 60
            },
            xAxis: {
                type: 'category',
                data: data[0]?.data.map(item => item.time) || []
            },
            yAxis: {
                type: 'value',
                name: yAxisLabel
            },
            series: data.map(series => ({
                name: series.name,
                type: 'line',
                smooth: true,
                data: series.data.map(item => item.value),
                itemStyle: {
                    // Each series will get a different color automatically
                }
            }))
        };

        chart.setOption(option);

        const handleResize = () => {
            chart.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            chart.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, [data, title, yAxisLabel]);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;