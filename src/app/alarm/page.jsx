// "use client"
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
// import { getAlarmsData } from '../../WebServices/ApiControllers';

// const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// // Fixed data table with 5 entries
// const dataTable = [
//     {
//         alarmLabel: "DH1.1 Open circuit",
//         createdTime: "2025-01-07 10:43 AM",
//         originatorName: "Shibaura SH-150TD",
//         duration: "00:00:00",
//         type: 86,
//         severity: "CRITICAL",
//         status: "Cleared unacknowledged"
//     },
//     {
//         alarmLabel: "DH1.1 Open circuit",
//         createdTime: "2025-01-05 01:40 AM",
//         originatorName: "Shibaura SH-150TD",
//         duration: "00:00:00",
//         type: 86,
//         severity: "CRITICAL",
//         status: "Cleared unacknowledged"
//     },
//     {
//         alarmLabel: "TPM check not completed",
//         createdTime: "2025-01-07 07:31 AM",
//         originatorName: "Shibaura SH-150TD",
//         duration: "00:00:22",
//         type: 120,
//         severity: "CRITICAL",
//         status: "Cleared unacknowledged"
//     },
//     {
//         alarmLabel: "Nozzle door not closed",
//         createdTime: "2025-01-09 04:16 PM",
//         originatorName: "Shibaura SH-150TB",
//         duration: "00:00:00",
//         type: 34,
//         severity: "CRITICAL",
//         status: "Cleared unacknowledged"
//     },
//     {
//         alarmLabel: "TPM check not completed",
//         createdTime: "2025-01-07 07:31 AM",
//         originatorName: "Shibaura SH-150TD",
//         duration: "00:00:00",
//         type: 120,
//         severity: "CRITICAL",
//         status: "Cleared unacknowledged"
//     }
// ];

// // Seeded random number generator for calendar data
// const seededRandom = (seed) => {
//     const x = Math.sin(seed++) * 10000;
//     return x - Math.floor(x);
// };

// const generateCalendarData = (year) => {
//     const data = {};

//     DAYS.forEach(day => {
//         data[day] = {};
//         MONTHS.forEach((month, monthIndex) => {
//             const values = Array(4).fill(null).map((_, weekIndex) => {
//                 const seed = year * 1000 + monthIndex * 100 + DAYS.indexOf(day) * 10 + weekIndex;
//                 const random = seededRandom(seed);

//                 if (monthIndex < 12) {
//                     if (random < 0.3) return 2;
//                     if (random < 0.6) return 1;
//                     return 0;
//                 }
//                 return random < 0.15 ? 2 : 0;
//             });

//             data[day][month] = values;
//         });
//     });

//     return data;
// };

// const AlarmPage = () => {
//     const [currentYear, setCurrentYear] = useState(2024);
//     const [calendarData, setCalendarData] = useState({});

//     useEffect(() => {
//         setCalendarData(generateCalendarData(currentYear));
//     }, [currentYear]);

//     const getStatusColor = (value) => {
//         if (value === -1) return 'bg-gray-300';
//         if (value === 0) return 'bg-red-300';
//         if (value === 1) return 'bg-red-500';
//         if (value === 2) return 'bg-red-800';
//         return 'bg-black';
//     };

//     return (
//         <div className="p-6 min-h-screen">
//             {/* Header Section */}
//             <div className="mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                     <h1 className="text-xl font-semibold">Alarms in {currentYear}</h1>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => setCurrentYear(prev => prev - 1)}
//                             className="p-1 bg-blue-400 text-white rounded hover:bg-blue-600"
//                         >
//                             <ChevronLeft size={20} />
//                         </button>
//                         <button
//                             onClick={() => setCurrentYear(prev => prev + 1)}
//                             className="p-1 bg-blue-400 text-white rounded hover:bg-blue-600"
//                         >
//                             <ChevronRight size={20} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Calendar View */}
//                 <div className="border rounded bg-white p-4">
//                     <div className="grid" style={{ gridTemplateColumns: '40px repeat(12, 1fr)' }}>
//                         <div className="h-6"></div>
//                         {MONTHS.map(month => (
//                             <div key={month} className="text-sm text-center mb-1">{month}</div>
//                         ))}

//                         {DAYS.map(day => (
//                             <React.Fragment key={day}>
//                                 <div className="text-sm pr-3 pt-3">{day}</div>
//                                 {MONTHS.map(month => (
//                                     <div key={`${day}-${month}`} className="px-0.5">
//                                         <div className="grid grid-cols-4 gap-0.5">
//                                             {calendarData[day]?.[month]?.map((value, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className={`${getStatusColor(value)} w-full aspect-square`}
//                                                 />
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </React.Fragment>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Legend */}
//                 <div className="flex justify-end items-center gap-1 mt-2 text-sm">
//                     <span>Less</span>
//                     <div className="flex gap-0.5">
//                         <div className="w-4 h-4 bg-gray-300"></div>
//                         <div className="w-4 h-4 bg-red-300"></div>
//                         <div className="w-4 h-4 bg-red-500"></div>
//                         <div className="w-4 h-4 bg-red-800"></div>
//                         <div className="w-4 h-4 bg-black"></div>
//                     </div>
//                     <span>More</span>
//                 </div>
//             </div>

//             {/* Alarm Controls */}
//             <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center gap-8">
//                     <h1 className='font-bold text-lg '>Alarm instanceId:</h1>
//                     <select className="border w-52 rounded p-1">
//                         <option value="">Select instanceId</option>
//                         <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">Furnace 1</option>
//                         <option value="047c3f09-2be1-4d39-bcd4-f2ac601d5ced">Furnace 2</option>
//                         <option value="7e75bcf7-67c8-40db-a0fe-aac0b0470fa2">Furnace 3</option>
//                         <option value="2eb825bd-b26c-4dc6-90fb-9b8e25bd6418">Furnace 4</option>
//                     </select>
//                 </div>
//                 <button className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     <Download size={20} />
//                     Export
//                 </button>
//             </div>

//             {/* Alarms Table */}
//             <div className="border rounded-lg overflow-hidden">
//                 <div className="min-w-full divide-y divide-gray-200">
//                     <div className="bg-gray-50">
//                         <div className="grid grid-cols-7 divide-x divide-gray-200">
//                             <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Alarm Label</div>
//                             <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created Time</div>
//                             <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Originator Name</div>
//                             <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Duration</div>
//                             <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</div>
//                             <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Severity</div>
//                             <div className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</div>
//                         </div>
//                     </div>
//                     <div className="bg-white divide-y divide-gray-200">
//                         {dataTable.map((alarm, index) => (
//                             <div key={index} className="grid grid-cols-7 divide-x divide-gray-200 hover:bg-gray-50">
//                                 <div className="px-6 py-4 text-sm text-gray-900">{alarm.alarmLabel}</div>
//                                 <div className="px-6 py-4 text-sm text-gray-900">{alarm.createdTime}</div>
//                                 <div className="px-6 py-4 text-sm text-gray-900">{alarm.originatorName}</div>
//                                 <div className="px-6 py-4 text-sm text-gray-900">{alarm.duration}</div>
//                                 <div className="px-6 py-4 text-sm text-gray-900">{alarm.type}</div>
//                                 <div className="px-6 py-4 text-sm text-red-500">{alarm.severity}</div>
//                                 <div className="px-6 py-4 text-sm text-gray-900">{alarm.status}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AlarmPage;



"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { getAlarmsData } from '../../WebServices/ApiControllers';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AlarmPage = () => {
    const [currentYear, setCurrentYear] = useState(2025);
    const [alarms, setAlarms] = useState([]);
    const [calendarData, setCalendarData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedInstance, setSelectedInstance] = useState('40ce6095-84c2-49a5-b5aa-c2f37ebdd40c');

    const fetchAlarms = async () => {
        setLoading(true);
        try {
            const params = {
                tenantId: 'ff0d9ff0-2bec-4085-b084-59f9af315f89',
                instanceId: selectedInstance,
                limit: 1000
            };

            const data = await getAlarmsData(params);
            setAlarms(data);
            processCalendarData(data);
        } catch (error) {
            console.error('Error fetching alarms:', error);
        } finally {
            setLoading(false);
        }
    };

    const processCalendarData = (data) => {
        const calData = {};
        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            calData[MONTHS[month]] = Array(daysInMonth).fill().map(() => ({
                high: 0,
                medium: 0,
                low: 0
            }));
        }

        data.forEach(alarm => {
            const date = new Date(alarm.timestamp);
            if (date.getFullYear() === currentYear) {
                const month = MONTHS[date.getMonth()];
                const day = date.getDate() - 1;

                if (calData[month] && calData[month][day]) {
                    if (alarm.serverity === "HIGH") {
                        calData[month][day].high++;
                    } else if (alarm.serverity === "MEDIUM") {
                        calData[month][day].medium++;
                    } else {
                        calData[month][day].low++;
                    }
                }
            }
        });

        setCalendarData(calData);
    };

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr || dateTimeStr.startsWith('0001-01-01')) {
            return '';
        }
        return new Date(dateTimeStr).toLocaleString();
    };

    useEffect(() => {
        fetchAlarms();
    }, [currentYear, selectedInstance]);

    const getStatusColor = (counts) => {
        if (counts.high > 0) return 'bg-red-700';
        if (counts.medium > 0) return 'bg-red-500';
        if (counts.low > 0) return 'bg-red-400';
        return 'bg-gray-200';
    };

    const tableHeaders = [
        { key: 'timestamp', label: 'Timestamp' },
        { key: 'instanceid', label: 'Instance ID' },
        { key: 'alarmtypeid', label: 'Alarm Type ID' },
        { key: 'alarmlabel', label: 'Alarm Label' },
        { key: 'isactive', label: 'Is Active' },
        { key: 'duration', label: 'Duration' },
        { key: 'starttime', label: 'Start Time' },
        { key: 'endtime', label: 'End Time' },
        { key: 'serverity', label: 'Severity' },
        { key: 'uuid', label: 'Alarm InstanceId' }
    ];

    return (
        <div className="p-4 bg-gray-50 overflow-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl px-4 font-semibold">Alarms in {currentYear}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentYear(prev => prev - 1)}
                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => setCurrentYear(prev => prev + 1)}
                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Calendar View */}
                <div className="border rounded-lg bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-12 gap-2">
                        {MONTHS.map(month => (
                            <div key={month} className="space-y-1">
                                <div className="text-sm font-semibold text-center text-gray-600">{month}</div>
                                <div className="grid grid-cols-7 gap-1">
                                    {calendarData[month]?.map((day, index) => (
                                        <div
                                            key={index}
                                            className={`${getStatusColor(day)} w-full aspect-square rounded-sm`}
                                            title={`High: ${day.high}, Medium: ${day.medium}, Low: ${day.low}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-end items-center gap-2 mt-2 text-sm">
                    <span className='text-xs font-semibold'>Less</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                        <div className="w-4 h-4 bg-red-600 rounded"></div>
                        <div className="w-4 h-4 bg-red-800 rounded"></div>
                    </div>
                    <span className='text-xs font-semibold'>More</span>
                </div>
            </div>

            {/* Alarm Controls */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-8">
                    <h2 className="font-bold text-lg">Alarm Instance:</h2>
                    <select
                        className="w-56 p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                        value={selectedInstance}
                        onChange={(e) => setSelectedInstance(e.target.value)}
                    >
                        <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">Furnace 1</option>
                        <option value="047c3f09-2be1-4d39-bcd4-f2ac601d5ced">Furnace 2</option>
                        <option value="7e75bcf7-67c8-40db-a0fe-aac0b0470fa2">Furnace 3</option>
                        <option value="2eb825bd-b26c-4dc6-90fb-9b8e25bd6418">Furnace 4</option>
                    </select>
                </div>
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    <Download size={20} />
                    Export
                </button>
            </div>

            {/* Alarms Table */}
            <div className="rounded overflow-x-auto bg-white shadow-sm border border-gray-400">
                <table className="min-w-full divide-y divide-gray-400">
                    <thead className="bg-gray-200">
                        <tr className='divide-x divide-gray-400'>
                            {tableHeaders.map((header) => (
                                <th
                                    key={header.key}
                                    className="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider"
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-400">
                        {loading ? (
                            <tr>
                                <td colSpan={tableHeaders.length} className="text-center py-4 ">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            alarms.map((alarm, index) => (
                                <tr key={index} className="hover:bg-gray-100 divide-x divide-gray-400">
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.timestamp)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.instanceid}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmtypeid}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmlabel}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.isactive ? 'True' : 'False'}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.duration}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.starttime)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.endtime)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.serverity}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.uuid}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlarmPage;