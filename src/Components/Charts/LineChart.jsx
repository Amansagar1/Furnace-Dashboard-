"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = ({ data, title, yAxisLabel }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            // title: {
            //     text: title,
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: data.map(item => item.time)
            },
            yAxis: {
                type: 'value',
                name: yAxisLabel
            },
            series: [{
                data: data.map(item => item.value),
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#10B981'
                }
            }]
        };

        chart.setOption(option);

        return () => chart.dispose();
    }, [data]);

    return <div ref={chartRef} className="w-full h-[300px]" />;
};

export default LineChart;