// "use client"
// import { useState } from 'react';
// import Navbar from '@/Components/Header/Navbar';
// import Sidebar from '@/Components/Sidebar/Sidebar';

// const HomePage = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const data = [
//         { ar: 100, pr: 80, qr: 95, oee: 90, runTime: "0h 30m", downTime: "0h 48m" },
//         { ar: 95, pr: 70, qr: 90, oee: 85, runTime: "1h 20m", downTime: "0h 10m" },
//         { ar: 85, pr: 60, qr: 75, oee: 80, runTime: "2h 15m", downTime: "1h 05m" },
//         { ar: 90, pr: 75, qr: 85, oee: 88, runTime: "3h 00m", downTime: "0h 20m" },
//         { ar: 92, pr: 78, qr: 88, oee: 89, runTime: "4h 10m", downTime: "0h 15m" },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Navbar toggleSidebar={toggleSidebar} />
//             <Sidebar isOpen={isSidebarOpen} />
//             <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
//                 <div className="flex flex-col bg-gray-50">
//                     {/* Status Indicators */}
//                     <div className="grid grid-cols-5 gap-4 p-6 bg-white shadow-md rounded-lg">
//                         {[
//                             { label: 'Running', color: 'bg-sky-500', value: '3/16' },
//                             { label: 'Power Off', color: 'bg-red-500', value: '5/16' },
//                             { label: 'Stop', color: 'bg-yellow-500', value: '4/16' },
//                             { label: 'Setup', color: 'bg-blue-500', value: '1/16' },
//                             { label: 'M/C Breakdown', color: 'bg-teal-500', value: '6%' },
//                         ].map((status, index) => (
//                             <div key={index} className="flex items-center space-x-3">
//                                 <div className={`w-6 h-6 ${status.color} rounded-full`}></div>
//                                 <span className="text-lg font-medium text-gray-700">{status.label}: {status.value}</span>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Table */}
//                     <div className="overflow-x-auto p-6">
//                         <table className="w-full border-collapse bg-white shadow-md rounded-lg">
//                             <thead className="bg-gray-200">
//                                 <tr>
//                                     <th className="font-medium text-gray-600">S.No</th>
//                                     <th className=" text-left font-medium text-gray-600">Machine Name</th>
//                                     <th className=" text-left font-medium text-gray-600">Machine Inventory Status</th>
//                                     <th className=" text-left font-medium text-gray-600 pl-4">AR</th>
//                                     <th className=" text-left font-medium text-gray-600 pl-4">PR</th>
//                                     <th className=" text-left font-medium text-gray-600 pl-4">QR</th>
//                                     <th className=" text-left font-medium text-gray-600 pl-4">OEE</th>
//                                     <th className=" text-left font-medium text-gray-600">Run Time</th>
//                                     <th className="p-4 text-left font-medium text-gray-600">Down Time</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data.map((item, index) => (
//                                     <tr key={index} className="hover:bg-gray-100 border-b">
//                                         <td className="p-4 text-center">{index + 1}</td>
//                                         <td className="">CNC Machine {index + 1}</td>
//                                         <td className=" ">
//                                             <div className="flex items-center justify-left space-x-1">
//                                                 <div className="w-10 h-2 bg-red-500"></div>
//                                                 <div className="w-10 h-2 bg-green-500"></div>
//                                                 <div className="w-10 h-2 bg-red-500"></div>
//                                                 <div className="w-10 h-2 bg-green-500"></div>
//                                             </div>
//                                         </td>
//                                         {["ar", "pr", "qr", "oee"].map((key) => (
//                                             <td key={key} className="p-1">
//                                                 <div className="relative w-12 h-12">
//                                                     {/* Thinner circle with live progress */}
//                                                     <div
//                                                         className="absolute top-0 left-0 w-full h-full rounded-full"
//                                                         style={{
//                                                             background: `conic-gradient(
//                          #38bdf8 ${item[key] * 3.6}deg,  
//                         #ddd 0deg
//                     )`,
//                                                             borderRadius: '50%',
//                                                             // Make the circle line thinner
//                                                             boxSizing: 'border-box',
//                                                             borderWidth: '1px',  // Even thinner line
//                                                             borderColor: ' #4caf50',
//                                                             transition: 'background 0.3s ease', // Smooth transition for live progress
//                                                         }}
//                                                     ></div>
//                                                     <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                                                         <span className="text-sm font-medium text-gray-700">{item[key]}%</span>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                         ))}


//                                         <td className=" text-left">{item.runTime}</td>
//                                         <td className="p-4 text-left">{item.downTime}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default HomePage;



"use client"
import React, { useState } from 'react';
import Navbar from '@/Components/Header/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { Activity, Power, Pause, Settings, AlertCircle } from 'lucide-react';

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const data = [
        {
            id: '560111',
            name: 'CNC Gantry Milling-1',
            status: 'Running',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red', 'green', 'red'],
            ar: 100.0, pr: 9.5, qr: 100.0, oee: 8.5,
            runTime: "00 hr 30 min",
            downTime: "00 hr 48 min"
        },
        {
            id: '560112',
            name: 'CNC Gantry Milling-2',
            status: 'Stop',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red', 'green', 'green'],
            ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
            runTime: "00 hr 00 min",
            downTime: "01 hr 25 min"
        },
        {
            id: '560101',
            name: 'CNC Press Brake-1',
            status: 'Stop',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red', 'red', 'red'],
            ar: 100.0, pr: 3.6, qr: 100.0, oee: 3.6,
            runTime: "00 hr 19 min",
            downTime: "00 hr 42 min"
        },
        {
            id: '560102',
            name: 'CNC Press Brake-2',
            status: 'Power Off',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red'],
            ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
            runTime: "00 hr 00 min",
            downTime: "00 hr 28 min"
        },
        {
            id: '560103',
            name: 'Radial Drilling-1',
            status: 'Power Off',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red', 'red'],
            ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
            runTime: "00 hr 00 min",
            downTime: "00 hr 00 min"
        },
    ];

    const statusIndicators = [
        {
            label: 'Running',
            count: '3/16',
            icon: () => (
                <div className="w-20 h-20 bg-white rounded-lg border-2 border-green-500 p-1">
                    <div className="w-full h-full bg-green-100 rounded flex items-center justify-center">
                        <Activity className="w-10 h-10 text-green-600" />
                    </div>
                </div>
            ),
            bgColor: 'bg-white',
            borderColor: 'border-green-500',
            textColor: 'text-green-600'
        },
        {
            label: 'Power Off',
            count: '7/16',
            icon: () => (
                <div className="w-20 h-20 bg-white rounded-lg border-2 border-sky-500 p-1">
                    <div className="w-full h-full bg-sky-100 rounded flex items-center justify-center">
                        <Power className="w-10 h-10 text-sky-600" />
                    </div>
                </div>
            ),
            bgColor: 'bg-white',
            borderColor: 'border-sky-500',
            textColor: 'text-sky-600'
        },
        {
            label: 'Stop',
            count: '6/16',
            icon: () => (
                <div className="w-20 h-20 bg-white rounded-lg border-2 border-red-500 p-1">
                    <div className="w-full h-full bg-red-100 rounded flex items-center justify-center">
                        <Pause className="w-10 h-10 text-red-600" />
                    </div>
                </div>
            ),
            bgColor: 'bg-white',
            borderColor: 'border-red-500',
            textColor: 'text-red-600'
        },
        {
            label: 'Setup',
            count: '1/6',
            icon: () => (
                <div className="w-20 h-20 bg-white rounded-lg border-2 border-yellow-500 p-1">
                    <div className="w-full h-full bg-yellow-100 rounded flex items-center justify-center">
                        <Settings className="w-10 h-10 text-yellow-600" />
                    </div>
                </div>
            ),
            bgColor: 'bg-white',
            borderColor: 'border-yellow-500',
            textColor: 'text-yellow-600'
        },
        {
            label: 'M/C Breakdown',
            count: '0/6',
            icon: () => (
                <div className="w-20 h-20 bg-white rounded-lg border-2 border-teal-500 p-1">
                    <div className="w-full h-full bg-teal-100 rounded flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-teal-600" />
                    </div>
                </div>
            ),
            bgColor: 'bg-white',
            borderColor: 'border-teal-500',
            textColor: 'text-teal-600'
        },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Running':
                return <Activity className="w-6 h-6 text-green-500" />;
            case 'Power Off':
                return <Power className="w-6 h-6 text-sky-500" />;
            case 'Stop':
                return <Pause className="w-6 h-6 text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                handleCollapse={handleCollapse}
            /> */}
            {/* <main className={`pt-16 transition-all duration-300 
            ${isSidebarOpen
                    ? (isCollapsed ? 'ml-16' : 'ml-64')
                    : 'ml-0'}`}> */}
            <div className="p-6">
                <div className="mb-6">

                    {/* Status Indicators */}
                    <div className="grid grid-cols-5 gap-4 mb-6">
                        {statusIndicators.map((indicator, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-4">
                                {indicator.icon()}
                                <div className="flex flex-col">
                                    <span className={`text-xl font-semibold ${indicator.textColor}`}>
                                        {indicator.count}
                                    </span>
                                    <span className="text-md font-bold">
                                        {indicator.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Machine Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 ">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-bold">S.No</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold">Machine Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold">Machine Summary Status</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold">AR</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold">PR</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold">QR</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold">OEE</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold">Run Time</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold">Down Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 py-4">{index + 1}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(item.status)}
                                                <div>
                                                    <p className="text-xl text-blue-500">{item.id}</p>
                                                    <p className="text-sm text-blue-600">{item.name}</p>
                                                    <p className="text-sm text-gray-600">{item.product}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex space-x-1">
                                                {item.statusBars.map((color, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-8 h-2 ${color === 'green' ? 'bg-green-500' : 'bg-red-500'}`}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        {['ar', 'pr', 'qr', 'oee'].map((metric) => (
                                            <td key={metric} className="px-4 py-4">
                                                <div className="flex justify-center">
                                                    <div className="relative w-12 h-12">
                                                        <svg className="w-12 h-12 transform -rotate-90">
                                                            <circle
                                                                className="text-gray-200"
                                                                strokeWidth="2"
                                                                stroke="currentColor"
                                                                fill="transparent"
                                                                r="20"
                                                                cx="24"
                                                                cy="24"
                                                            />
                                                            <circle
                                                                className="text-blue-500"
                                                                strokeWidth="2"
                                                                strokeDasharray={`${item[metric] * 1.256}, 126`}
                                                                strokeLinecap="round"
                                                                stroke="currentColor"
                                                                fill="transparent"
                                                                r="20"
                                                                cx="24"
                                                                cy="24"
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-sm font-medium">
                                                                {item[metric].toFixed(1)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        ))}
                                        <td className="px-4 py-4 text-sm text-gray-600">{item.runTime}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">{item.downTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* </main> */}
        </div>
    );
};

export default HomePage;