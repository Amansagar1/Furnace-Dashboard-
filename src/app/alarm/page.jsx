"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Fixed data table with 5 entries
const dataTable = [
    {
        alarmLabel: "DH1.1 Open circuit",
        createdTime: "2025-01-07 10:43 AM",
        originatorName: "Shibaura SH-150TD",
        duration: "00:00:00",
        type: 86,
        severity: "CRITICAL",
        status: "Cleared unacknowledged"
    },
    {
        alarmLabel: "DH1.1 Open circuit",
        createdTime: "2025-01-05 01:40 AM",
        originatorName: "Shibaura SH-150TD",
        duration: "00:00:00",
        type: 86,
        severity: "CRITICAL",
        status: "Cleared unacknowledged"
    },
    {
        alarmLabel: "TPM check not completed",
        createdTime: "2025-01-07 07:31 AM",
        originatorName: "Shibaura SH-150TD",
        duration: "00:00:22",
        type: 120,
        severity: "CRITICAL",
        status: "Cleared unacknowledged"
    },
    {
        alarmLabel: "Nozzle door not closed",
        createdTime: "2025-01-09 04:16 PM",
        originatorName: "Shibaura SH-150TB",
        duration: "00:00:00",
        type: 34,
        severity: "CRITICAL",
        status: "Cleared unacknowledged"
    },
    {
        alarmLabel: "TPM check not completed",
        createdTime: "2025-01-07 07:31 AM",
        originatorName: "Shibaura SH-150TD",
        duration: "00:00:00",
        type: 120,
        severity: "CRITICAL",
        status: "Cleared unacknowledged"
    }
];

// Seeded random number generator for calendar data
const seededRandom = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const generateCalendarData = (year) => {
    const data = {};

    DAYS.forEach(day => {
        data[day] = {};
        MONTHS.forEach((month, monthIndex) => {
            const values = Array(4).fill(null).map((_, weekIndex) => {
                const seed = year * 1000 + monthIndex * 100 + DAYS.indexOf(day) * 10 + weekIndex;
                const rand = seededRandom(seed);

                if (monthIndex < 12) {
                    if (rand < 0.3) return 2;
                    if (rand < 0.6) return 1;
                    return 0;
                }
                return rand < 0.15 ? 2 : 0;
            });

            data[day][month] = values;
        });
    });

    return data;
};

const AlarmPage = () => {
    const [currentYear, setCurrentYear] = useState(2024);
    const [calendarData, setCalendarData] = useState({});

    useEffect(() => {
        setCalendarData(generateCalendarData(currentYear));
    }, [currentYear]);

    const getStatusColor = (value) => {
        if (value === -1) return 'bg-gray-300';
        if (value === 0) return 'bg-red-300';
        if (value === 1) return 'bg-red-500';
        if (value === 2) return 'bg-red-800';
        return 'bg-green-500';
    };

    return (
        <div className="p-6 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">Alarms in {currentYear}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentYear(prev => prev - 1)}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-red-600"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setCurrentYear(prev => prev + 1)}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-red-600"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Calendar View */}
                <div className="border rounded bg-white p-4">
                    <div className="grid" style={{ gridTemplateColumns: '40px repeat(12, 1fr)' }}>
                        <div className="h-6"></div>
                        {MONTHS.map(month => (
                            <div key={month} className="text-sm text-center mb-1">{month}</div>
                        ))}

                        {DAYS.map(day => (
                            <React.Fragment key={day}>
                                <div className="text-sm pr-3 pt-3">{day}</div>
                                {MONTHS.map(month => (
                                    <div key={`${day}-${month}`} className="px-0.5">
                                        <div className="grid grid-cols-4 gap-0.5">
                                            {calendarData[day]?.[month]?.map((value, index) => (
                                                <div
                                                    key={index}
                                                    className={`${getStatusColor(value)} w-full aspect-square`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-end items-center gap-1 mt-2 text-sm">
                    <span>Less</span>
                    <div className="flex gap-0.5">
                        <div className="w-4 h-4 bg-gray-300"></div>
                        <div className="w-4 h-4 bg-red-300"></div>
                        <div className="w-4 h-4 bg-red-500"></div>
                        <div className="w-4 h-4 bg-red-800"></div>
                        <div className="w-4 h-4 bg-green-500"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>

            {/* Alarm Controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-8">
                    <h1 className='font-bold text-lg '>Alarm breakdown: 1/1/{currentYear}, 12:00 AM</h1>
                    <select className="border w-52 rounded p-1">
                        <option>Shibaura SH-250TC, ...</option>
                        <option>Shibaura SH-251TC, ...</option>
                        <option>Shibaura SH-252TC, ...</option>
                        <option>Shibaura SH-253TC, ...</option>
                    </select>
                </div>
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    <Download size={20} />
                    Export
                </button>
            </div>

            {/* Alarms Table */}
            <div className="border rounded-lg overflow-hidden">
                <div className="min-w-full divide-y divide-gray-200">
                    <div className="bg-gray-50">
                        <div className="grid grid-cols-7 divide-x divide-gray-200">
                            <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Alarm Label</div>
                            <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created Time</div>
                            <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Originator Name</div>
                            <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Duration</div>
                            <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</div>
                            <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Severity</div>
                            <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</div>
                        </div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                        {dataTable.map((alarm, index) => (
                            <div key={index} className="grid grid-cols-7 divide-x divide-gray-200 hover:bg-gray-50">
                                <div className="px-6 py-4 text-sm text-gray-900">{alarm.alarmLabel}</div>
                                <div className="px-6 py-4 text-sm text-gray-900">{alarm.createdTime}</div>
                                <div className="px-6 py-4 text-sm text-gray-900">{alarm.originatorName}</div>
                                <div className="px-6 py-4 text-sm text-gray-900">{alarm.duration}</div>
                                <div className="px-6 py-4 text-sm text-gray-900">{alarm.type}</div>
                                <div className="px-6 py-4 text-sm text-red-500">{alarm.severity}</div>
                                <div className="px-6 py-4 text-sm text-gray-900">{alarm.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlarmPage;