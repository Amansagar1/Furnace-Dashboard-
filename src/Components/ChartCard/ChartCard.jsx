"use client";

import React from 'react';
import TimeRangeSelector from './TimeRange';

const ChartCard = ({ title, children, timeRange, onTimeRangeChange, isLoading }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                <TimeRangeSelector
                    activeRange={timeRange}
                    onRangeChange={onTimeRangeChange}
                />
            </div>
            {children}
        </div>
    );
};

export default ChartCard;