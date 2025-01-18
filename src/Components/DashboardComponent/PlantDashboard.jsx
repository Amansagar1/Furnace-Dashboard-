
// // import React, { useState, useEffect } from 'react';
// // import { Thermometer, Gauge, Activity, RefreshCw, ChevronDown } from 'lucide-react';
// // import DashboardInfoCard from '../Charts/DescriptionCard';
// // import BarChart from '../Charts/BarChart';
// // import LineChart from '../Charts/LineChart';
// // import DataTable from '../Charts/DataTable';
// // import InfoCard from '../Charts/InfoCard';
// // import SvgImage from '../Charts/SvgImage';
// // import RejectionForm from '../RejectionForm/form';
// // import { getHistorialData } from '@/WebServices/ApiControllers';
// // import ChartCard from '../ChartCard/ChartCard';

// // const PlantDashboard = ({ params }) => {
// //     const [isRejectionFormOpen, setIsRejectionFormOpen] = useState(false);
// //     const [voltageData, setVoltageData] = useState([]);
// //     const [currentData, setCurrentData] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [voltageTimeRange, setVoltageTimeRange] = useState('24h');
// //     const [currentTimeRange, setCurrentTimeRange] = useState('24h');
// //     const [refreshRate, setRefreshRate] = useState(0);
// //     const [isRefreshDropdownOpen, setIsRefreshDropdownOpen] = useState(false);

// //     const resolvedParams = React.use(params);
// //     const furnaceId = resolvedParams?.furnace || 'furnace1';

// //     const refreshOptions = [
// //         { label: 'Now', value: 0 },
// //         { label: '5 seconds', value: 5000 },
// //         { label: '30 seconds', value: 30000 },
// //         { label: '1 minute', value: 60000 },
// //     ];

// //     const machineData = {
// //         name: 'Shibaura SH-150TB',
// //         active: true,
// //         macId: 'sh150tb',
// //         macNo: 'TS - 01500790',
// //         macCf: '150/510 - 600, D40',
// //         moldId: 'front384',
// //         partNo: '900500011850',
// //         materialName: 'hips',
// //         heaterStatus: 'OFF'
// //     };

// //     const dataTable = [
// //         {
// //             title: 'Cylinder heating off',
// //             createdTime: '2025-01-04 07:37 PM',
// //             duration: '00:00:00',
// //             type: '2',
// //             severity: 'CRITICAL',
// //             status: 'Cleared unacknowledged'
// //         },
// //         {
// //             title: 'Hotrunner heating off',
// //             createdTime: '2025-01-04 07:37 PM',
// //             duration: '00:00:00',
// //             type: '169',
// //             severity: 'CRITICAL',
// //             status: 'Cleared unacknowledged'
// //         }
// //     ];

// //     const dashboardData = {
// //         furnace1: {
// //             stats: [
// //                 { title: 'Average Temperature', value: '850°C', trend: 5, icon: Thermometer, color: 'bg-red-500' },
// //                 { title: 'Average Pressure', value: '2.4 kg/cm²', trend: -2, icon: Gauge, color: 'bg-blue-500' },
// //                 { title: 'Efficiency', value: '92%', trend: 3, icon: Activity, color: 'bg-green-500' }
// //             ]
// //         }
// //     };

// //     const getTimeRangeInDays = (range) => {
// //         switch (range) {
// //             case '24h':
// //                 return 1;
// //             case '3d':
// //                 return 3;
// //             case '7d':
// //                 return 7;
// //             default:
// //                 return 1;
// //         }
// //     };

// //     const formatDate = (date) => {
// //         return date.toISOString().split('.')[0];
// //     };

// //     const fetchChartData = async (timeRange, dataType) => {
// //         try {
// //             setIsLoading(true);
// //             const now = new Date();
// //             const days = getTimeRangeInDays(timeRange);
// //             const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));

// //             const response = await getHistorialData({
// //                 instanceId: "04a0a702-98c4-4fe6-a503-bb87e3a8bffc",
// //                 variable: dataType,
// //                 to: formatDate(now),
// //                 from: formatDate(pastDate),
// //                 frequency: "hour",
// //                 limit: 1000
// //             });

// //             const transformedData = response.map(item => ({
// //                 time: new Date(item.timestamp).toLocaleDateString(),
// //                 value: item.value
// //             }));

// //             if (dataType === "Voltage") {
// //                 setVoltageData(transformedData);
// //             } else {
// //                 setCurrentData(transformedData);
// //             }
// //         } catch (error) {
// //             console.error(`Error fetching ${dataType} data:`, error);
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     // Handle refresh rate changes
// //     useEffect(() => {
// //         if (refreshRate === 0) {
// //             // Fetch immediately for "Now" option
// //             fetchChartData(voltageTimeRange, "Voltage");
// //             fetchChartData(currentTimeRange, "Current");
// //             return;
// //         }

// //         const refreshInterval = setInterval(() => {
// //             fetchChartData(voltageTimeRange, "Voltage");
// //             fetchChartData(currentTimeRange, "Current");
// //         }, refreshRate);

// //         return () => clearInterval(refreshInterval);
// //     }, [refreshRate, voltageTimeRange, currentTimeRange]);

// //     const handleRefreshClick = () => {
// //         if (refreshRate === 0) {
// //             // Immediate refresh for "Now" option
// //             fetchChartData(voltageTimeRange, "Voltage");
// //             fetchChartData(currentTimeRange, "Current");
// //         }
// //         setIsRefreshDropdownOpen(!isRefreshDropdownOpen);
// //     };

// //     const data = dashboardData[furnaceId] || dashboardData.furnace1;
// //     const furnaceNumber = furnaceId.replace('furnace', '');

// //     return (
// //         <div className="p-6 space-y-6">
// //             <div className="flex justify-between items-center mb-4">
// //                 <h1 className="text-2xl text-center font-bold">
// //                     {/* Furnace {furnaceNumber} Dashboard */}
// //                     Furnace Operational Details
// //                 </h1>

// //                 <div className="relative z-50">
// //                     <button
// //                         onClick={handleRefreshClick}
// //                         className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg border hover:bg-gray-50 space-x-2"
// //                     >
// //                         <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
// //                         <span>{refreshOptions.find(opt => opt.value === refreshRate)?.label || 'Refresh'}</span>
// //                         <ChevronDown className="w-4 h-4" />
// //                     </button>

// //                     {isRefreshDropdownOpen && (
// //                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
// //                             {refreshOptions.map((option) => (
// //                                 <button
// //                                     key={option.value}
// //                                     onClick={() => {
// //                                         setRefreshRate(option.value);
// //                                         setIsRefreshDropdownOpen(false);
// //                                     }}
// //                                     className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
// //                                 >
// //                                     {option.label}
// //                                 </button>
// //                             ))}
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Rest of the dashboard components remain unchanged */}
// //             <div className="flex gap-4">
// //                 <div className="w-1/4 min-w-[400px]">
// //                     <InfoCard
// //                         machineData={machineData}
// //                         onOpenRejectionForm={() => setIsRejectionFormOpen(true)}
// //                     />
// //                 </div>

// //                 <div className="flex-1">
// //                     <SvgImage data={voltageData} />
// //                 </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 {data.stats.map((stat, index) => (
// //                     <DashboardInfoCard key={index} {...stat} />
// //                 ))}
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <ChartCard
// //                     title="Temperature Trends"
// //                     timeRange={voltageTimeRange}
// //                     onTimeRangeChange={setVoltageTimeRange}
// //                 >
// //                     <BarChart
// //                         data={voltageData}
// //                         title="Voltage Trends"
// //                         yAxisLabel="Temp (°C)"
// //                     />
// //                 </ChartCard>

// //                 <ChartCard
// //                     title="Pressure Trends"
// //                     timeRange={currentTimeRange}
// //                     onTimeRangeChange={setCurrentTimeRange}
// //                 >
// //                     <LineChart
// //                         data={currentData}
// //                         title="Current Trends"
// //                         yAxisLabel="Pressure (kg/cm²)"
// //                     />
// //                 </ChartCard>
// //             </div>

// //             <div className="bg-white rounded-lg shadow-md">
// //                 <DataTable data={dataTable} />
// //             </div>

// //             <RejectionForm
// //                 isOpen={isRejectionFormOpen}
// //                 onClose={() => setIsRejectionFormOpen(false)}
// //             />
// //         </div>
// //     );
// // };

// // export default PlantDashboard;




// import React, { useState, useEffect } from 'react';
// import { Menu, X, ChevronLeft, ChevronRight, RefreshCw, ChevronDown, Thermometer, Gauge, Activity } from 'lucide-react';
// import DashboardInfoCard from '../Charts/DescriptionCard';
// import BarChart from '../Charts/BarChart';
// import LineChart from '../Charts/LineChart';
// import DataTable from '../Charts/DataTable';
// import InfoCard from '../Charts/InfoCard';
// import SvgImage from '../Charts/SvgImage';
// import RejectionForm from '../RejectionForm/form';
// import { getHistorialData } from '@/WebServices/ApiControllers';
// import ChartCard from '../ChartCard/ChartCard';

// const PlantDashboard = ({ params }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isRejectionFormOpen, setIsRejectionFormOpen] = useState(false);
//     const [voltageData, setVoltageData] = useState([]);
//     const [currentData, setCurrentData] = useState([]);
//     const [svgData, setSvgData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [voltageTimeRange, setVoltageTimeRange] = useState('24h');
//     const [currentTimeRange, setCurrentTimeRange] = useState('24h');
//     const [refreshRate, setRefreshRate] = useState(0);
//     const [isRefreshDropdownOpen, setIsRefreshDropdownOpen] = useState(false);

//     const resolvedParams = React.use(params);
//     const furnaceId = resolvedParams?.furnace || 'furnace1';

//     const refreshOptions = [
//         { label: 'Now', value: 0 },
//         { label: '5 seconds', value: 5000 },
//         { label: '30 seconds', value: 30000 },
//         { label: '1 minute', value: 60000 },
//     ];

//     const machineData = {
//         name: 'Shibaura SH-150TB',
//         active: true,
//         macId: 'sh150tb',
//         macNo: 'TS - 01500790',
//         macCf: '150/510 - 600, D40',
//         moldId: 'front384',
//         partNo: '900500011850',
//         materialName: 'hips',
//         heaterStatus: 'OFF'
//     };

//     const overviewCards = [
// { label: "Overall OEE", value: "94%", color: "green", change: "increase" },
// { label: "Running Production", value: "85.60%", color: "orange", change: "decrease" },
// { label: "Quality", value: "100%", color: "green", change: "increase" },
// { label: "Performance", value: "94%", color: "orange", change: "decrease" },
// { label: "Downtime", value: "10%", color: "orange", change: "decrease" }
//     ];

//     const dashboardStats = [
//         { title: 'Average Temperature', value: '850°C', trend: 5, icon: Thermometer, color: 'bg-red-500' },
//         { title: 'Average Pressure', value: '2.4 kg/cm²', trend: -2, icon: Gauge, color: 'bg-blue-500' },
//         { title: 'Efficiency', value: '92%', trend: 3, icon: Activity, color: 'bg-green-500' }
//     ];

//     const dataTable = [
// {
//     title: 'Cylinder heating off',
//     createdTime: '2025-01-04 07:37 PM',
//     duration: '00:00:00',
//     type: '2',
//     severity: 'CRITICAL',
//     status: 'Cleared unacknowledged'
// },
// {
//     title: 'Hotrunner heating off',
//     createdTime: '2025-01-04 07:37 PM',
//     duration: '00:00:00',
//     type: '169',
//     severity: 'CRITICAL',
//     status: 'Cleared unacknowledged'
// },
//         {
//             title: 'Cylinder heating on',
//             createdTime: '2025-01-04 07:37 PM',
//             duration: '00:10:50',
//             type: '20',
//             severity: 'CRITICAL',
//             status: 'Cleared unacknowledged'
//         },
//         {
//             title: 'Hotrunner heating on',
//             createdTime: '2025-01-04 07:37 PM',
//             duration: '01:20:00',
//             type: '91',
//             severity: 'CRITICAL',
//             status: 'Cleared unacknowledged'
//         },
//     ];

//     const getTimeRangeInDays = (range) => {
//         switch (range) {
//             case '24h': return 1;
//             case '3d': return 3;
//             case '7d': return 7;
//             default: return 1;
//         }
//     };

//     const formatDate = (date) => {
//         return date.toISOString().split('.')[0];
//     };

//     const fetchData = async (timeRange, dataType) => {
//         try {
//             setIsLoading(true);
//             const now = new Date();
//             const days = getTimeRangeInDays(timeRange);
//             const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));

//             const response = await getHistorialData({
//                 instanceId: "04a0a702-98c4-4fe6-a503-bb87e3a8bffc",
//                 variable: dataType,
//                 to: formatDate(now),
//                 from: formatDate(pastDate),
//                 frequency: "hour",
//                 limit: 1000
//             });

//             const transformedData = response.map(item => ({
//                 time: new Date(item.timestamp).toLocaleDateString(),
//                 value: item.value
//             }));

//             switch (dataType) {
//                 case "Voltage":
//                     setVoltageData(transformedData);
//                     break;
//                 case "Current":
//                     setCurrentData(transformedData);
//                     break;
//                 case "SVG":
//                     setSvgData(transformedData);
//                     break;
//             }
//         } catch (error) {
//             console.error(`Error fetching ${dataType} data:`, error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         const fetchAllData = () => {
//             fetchData(voltageTimeRange, "Voltage");
//             fetchData(currentTimeRange, "Current");
//             fetchData(voltageTimeRange, "SVG");
//         };

//         if (refreshRate === 0) {
//             fetchAllData();
//             return;
//         }

//         fetchAllData();
//         const interval = setInterval(fetchAllData, refreshRate);
//         return () => clearInterval(interval);
//     }, [refreshRate, voltageTimeRange, currentTimeRange]);

//     return (
//         <div className="flex h-screen bg-gray-100">

//             {/* Main Content */}
//             <div className={`flex-1 transition-all duration-300`}>
//                 {/* Top Header */}
//                 <div className="bg-white shadow-sm p-2 sticky top-0 z-20 flex justify-between items-center">
//                     <h1 className="text-xl text-center font-bold">Furnace Operational Details</h1>
//                     <div className="relative">
//                         <button
//                             onClick={() => setIsRefreshDropdownOpen(!isRefreshDropdownOpen)}
//                             className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border hover:bg-gray-50"
//                         >
//                             <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
//                             <span>{refreshOptions.find(opt => opt.value === refreshRate)?.label || 'Refresh'}</span>
//                             <ChevronDown className="w-4 h-4" />
//                         </button>

//                         {isRefreshDropdownOpen && (
//                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
//                                 {refreshOptions.map((option) => (
//                                     <button
//                                         key={option.value}
//                                         onClick={() => {
//                                             setRefreshRate(option.value);
//                                             setIsRefreshDropdownOpen(false);
//                                         }}
//                                         className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//                                     >
//                                         {option.label}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Dashboard Content */}
//                 <div className="p-4 space-y-6 overflow-auto">
// {/* Machine Details and Overview Cards Row */}
// <div className="flex flex-wrap lg:flex-nowrap gap-2">
//     {/* Machine Details Card */}
//     <div className="w-full lg:w-1/6 bg-white rounded-lg shadow-md flex flex-col justify-between">
//         <InfoCard
//             machineData={machineData}
//             onOpenRejectionForm={() => setIsRejectionFormOpen(true)}
//         />
//     </div>

//     {/* Overview Cards */}
//     {overviewCards.map((item, index) => (
//         <div
//             key={index}
//             className={`w-full lg:w-1/6 bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border-l-4
//                 ${item.color === 'green' ? 'border-[#00DD6E]' : 'border-orange-500'}`}
//         >
//             <div className='flex flex-col items-center justify-center'>
//                 <h2 className="text-gray-500 text-lg">{item.label}</h2>
//                 <div className="mt-2 text-3xl font-bold text-gray-800">
//                     {item.value}
//                 </div>
//             </div>
//             <div className="mt-4 flex justify-center items-center space-x-2">
//                 <button
//                     className={`w-6 h-6 flex items-center justify-center rounded-full border-2 
//                         ${item.change === "increase" ? "border-green-500" : "border-red-500"} bg-white`}
//                 >
//                     {item.change === "increase" ? "↑" : "↓"}
//                 </button>
//                 <span className={`text-sm ${item.change === "increase" ? "text-green-500" : "text-red-500"
//                     }`}>
//                     {item.change === "increase" ? "+5%" : "-5%"}
//                 </span>
//             </div>
//         </div>
//     ))}
// </div>

//                     {/* SVG Image */}
//                     <div className="bg-white rounded-lg shadow-md">
//                         <SvgImage data={voltageData} />
//                     </div>

//                     {/* Dashboard Info Cards */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {dashboardStats.map((stat, index) => (
//                             <DashboardInfoCard key={index} {...stat} />
//                         ))}
//                     </div>

//                     {/* Data Table */}
//                     <div className="bg-white rounded-lg shadow-md border">
//                         <DataTable data={dataTable} />
//                     </div>

//                     {/* Charts Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="bg-white rounded-lg shadow-md border">
//                             <ChartCard
//                                 title="Temperature Trends"
//                                 timeRange={voltageTimeRange}
//                                 onTimeRangeChange={setVoltageTimeRange}
//                             >
//                                 <BarChart
//                                     data={voltageData}
//                                     title="Voltage Trends"
//                                     yAxisLabel="Temp (°C)"
//                                 />
//                             </ChartCard>
//                         </div>
//                         <div className="bg-white rounded-lg shadow-md border">
//                             <ChartCard
//                                 title="Pressure Trends"
//                                 timeRange={currentTimeRange}
//                                 onTimeRangeChange={setCurrentTimeRange}
//                             >
//                                 <LineChart
//                                     data={currentData}
//                                     title="Current Trends"
//                                     yAxisLabel="Pressure (kg/cm²)"
//                                 />
//                             </ChartCard>
//                         </div>
//                         <div className="bg-white rounded-lg shadow-md border">
//                             <ChartCard
//                                 title="AIR_FLOW_RPM Trends"
//                                 timeRange={voltageTimeRange}
//                                 onTimeRangeChange={setVoltageTimeRange}
//                             >
//                                 <BarChart
//                                     data={voltageData}
//                                     title="AIR_FLOW_RPM Trends"
//                                     yAxisLabel="Temp (°C)"
//                                 />
//                             </ChartCard>
//                         </div>
//                         <div className="bg-white rounded-lg shadow-md border">
//                             <ChartCard
//                                 title="GAS_FLW_RATE Trends"
//                                 timeRange={currentTimeRange}
//                                 onTimeRangeChange={setCurrentTimeRange}
//                             >
//                                 <LineChart
//                                     data={currentData}
//                                     title="GAS_FLW_RATE Trends"
//                                     yAxisLabel="Pressure (kg/cm²)"
//                                 />
//                             </ChartCard>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Rejection Form Modal */}
//             <RejectionForm
//                 isOpen={isRejectionFormOpen}
//                 onClose={() => setIsRejectionFormOpen(false)}
//             />
//         </div>
//     );
// };

// export default PlantDashboard;



import React, { useState, useEffect } from 'react';
import { RefreshCw, ChevronDown, Thermometer, Gauge, Activity } from 'lucide-react';
import DashboardInfoCard from '../Charts/DescriptionCard';
import LineChart from '../Charts/LineChart';
import DataTable from '../Charts/DataTable';
import InfoCard from '../Charts/InfoCard';
import SvgImage from '../Charts/SvgImage';
import RejectionForm from '../RejectionForm/form';
import { getHistorialData, getAlarmsData } from '@/WebServices/ApiControllers';
import ChartCard from '../ChartCard/ChartCard';

const PlantDashboard = ({ params }) => {
    // State Management
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isRejectionFormOpen, setIsRejectionFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('24h');
    const [refreshRate, setRefreshRate] = useState(0);
    const [isRefreshDropdownOpen, setIsRefreshDropdownOpen] = useState(false);
    const [alarmData, setAlarmData] = useState([]);

    // Data States
    const [svgData, setSvgData] = useState([]);
    const [basicMetricsData, setBasicMetricsData] = useState([]);
    const [airFlowData, setAirFlowData] = useState([]);
    const [topTempData, setTopTempData] = useState([]);
    const [bottomTempData, setBottomTempData] = useState([]);
    const [burnerPressureData, setBurnerPressureData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);

    const instanceId = "40ce6095-84c2-49a5-b5aa-c2f37ebdd40c";

    // Add authentication check
    useEffect(() => {
        const token = Cookies.get('token');
        const tenantId = Cookies.get('tenantId');

        if (!token || !tenantId) {
            router.push('/login');
            return;
        }
    }, []);

    // Prevent initial render until authentication is confirmed
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    const refreshOptions = [
        { label: 'Now', value: 0 },
        { label: '5 seconds', value: 5000 },
        { label: '30 seconds', value: 30000 },
        { label: '1 minute', value: 60000 },
    ];

    const machineData = {
        name: 'Furnace Control System',
        active: true,
        macId: 'FCS001',
        macNo: 'FC-123456',
        macCf: 'Industrial Grade Furnace',
        status: 'Operational'
    };

    const overviewCards = [
        { label: "Overall OEE", value: "94%", color: "green", change: "increase" },
        { label: "Running Production", value: "85.60%", color: "orange", change: "decrease" },
        { label: "Quality", value: "100%", color: "green", change: "increase" },
        { label: "Performance", value: "94%", color: "orange", change: "decrease" },
        { label: "Downtime", value: "10%", color: "orange", change: "decrease" }
    ];

    const dashboardStats = [
        { title: 'Average Temperature', value: '850°C', trend: 5, icon: Thermometer, color: 'bg-red-500' },
        { title: 'Average Pressure', value: '2.4 kg/cm²', trend: -2, icon: Gauge, color: 'bg-blue-500' },
        { title: 'System Efficiency', value: '92%', trend: 3, icon: Activity, color: 'bg-green-500' }
    ];

    const dataTable = [
        {
            title: 'Cylinder heating off',
            createdTime: '2025-01-04 07:37 PM',
            duration: '00:00:00',
            type: '2',
            severity: 'CRITICAL',
            status: 'Cleared unacknowledged'
        },
        {
            title: 'Hotrunner heating off',
            createdTime: '2025-01-04 07:37 PM',
            duration: '00:00:00',
            type: '169',
            severity: 'CRITICAL',
            status: 'Cleared unacknowledged'
        },
        {
            title: 'High Temperature Alert',
            createdTime: '2025-01-13 02:37 PM',
            duration: '00:05:00',
            type: 'Temperature',
            severity: 'WARNING',
            status: 'Resolved'
        },
        {
            title: 'Pressure Fluctuation',
            createdTime: '2025-01-13 01:15 PM',
            duration: '00:10:00',
            type: 'Pressure',
            severity: 'ALERT',
            status: 'Monitoring'
        }
    ];

    // Add this function inside the PlantDashboard component
    const processAlarms = (data) => {
        // Group alarms by UUID
        const alarmGroups = data.reduce((acc, alarm) => {
            if (!acc[alarm.uuid]) {
                acc[alarm.uuid] = [];
            }
            acc[alarm.uuid].push(alarm);
            return acc;
        }, {});

        // Filter alarms based on the requirements
        const filteredAlarms = [];
        Object.values(alarmGroups).forEach(group => {
            if (group.length === 2) {
                // If there are two alarms with the same UUID
                const activeAlarm = group.find(a => a.isactive === true);
                const inactiveAlarm = group.find(a => a.isactive === false);
                if (activeAlarm && inactiveAlarm) {
                    // If one is active and one is inactive, show only the inactive one
                    filteredAlarms.push(inactiveAlarm);
                }
            } else if (group.length === 1 && group[0].isactive === true) {
                // If there's only one alarm and it's active, show it
                filteredAlarms.push(group[0]);
            }
        });

        return filteredAlarms; // Return only the last 10 alarms
    };

    // Time range utility functions
    const getTimeRangeInDays = (range) => {
        switch (range) {
            case '24h': return 1;
            case '3d': return 3;
            case '7d': return 7;
            default: return 1;
        }
    };

    const formatDate = (date) => {
        return date.toISOString().split('.')[0];
    };

    // fetchData function to handle single variable data
    const fetchSingleData = async (variable) => {
        try {
            const now = new Date();
            const days = getTimeRangeInDays(timeRange);
            const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));

            const response = await getHistorialData({
                instanceId,
                variable,
                to: formatDate(now),
                from: formatDate(pastDate),
                frequency: "hour",
                limit: 1000
            });

            return response.map(item => ({
                time: new Date(item.timestamp).toLocaleDateString(),
                value: item.value
            }));
        } catch (error) {
            console.error(`Error fetching ${variable} data:`, error);
            return [];
        }
    };

    // Keep existing fetchData function for multiple variables...
    const fetchData = async (variables, setDataFunction) => {
        try {
            const now = new Date();
            const days = getTimeRangeInDays(timeRange);
            const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));

            const promises = variables.map(variable =>
                getHistorialData({
                    instanceId,
                    variable,
                    to: formatDate(now),
                    from: formatDate(pastDate),
                    frequency: "hour",
                    limit: 1000
                })
            );

            const responses = await Promise.all(promises);

            const seriesData = responses.map((response, index) => ({
                name: variables[index],
                data: response.map(item => ({
                    time: new Date(item.timestamp).toLocaleDateString(),
                    value: item.value
                }))
            }));

            setDataFunction(seriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Add this function to fetch alarm data
    const fetchAlarmData = async () => {
        try {
            const params = {
                tenantId: 'ff0d9ff0-2bec-4085-b084-59f9af315f89',
                instanceId: instanceId,
                limit: 1000
            };
            const data = await getAlarmsData(params);
            const processedData = processAlarms(data);
            setAlarmData(processedData);
        } catch (error) {
            console.error('Error fetching alarm data:', error);
        }
    };


    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                // Fetch voltage data separately for SVG
                const voltageResult = await fetchSingleData('AIR_FLOW_RPM');
                setSvgData(voltageResult);

                // Fetch all other data
                await Promise.all([
                    fetchAlarmData(),
                    fetchData(['P_GAS_LINE_B_HP', '	P_GAS_LINE_A_HP'], setBasicMetricsData),
                    fetchData(['AIR_FLOW_RPM'], setAirFlowData),
                    fetchData([
                        'RTD_1_TOP_TEMP', 'RTD_2_TOP_TEMP', 'RTD_3_TOP_TEMP',
                        'RTD_4_TOP_TEMP', 'RTD_5_TOP_TEMP', 'RTD_6_TOP_TEMP'
                    ], setTopTempData),
                    fetchData([
                        'RTD_6_BTM_TEMP', 'RTD_5_BTM_TEMP', 'RTD_4_BTM_TEMP',
                        'RTD_3_BTM_TEMP', 'RTD_2_BTM_TEMP', 'RTD_1_BTM_TEMP'
                    ], setBottomTempData),
                    fetchData([
                        'BUNR_4_PRV_PRES', 'BUNR_3_PRV_PRES',
                        'BUNR_2_PRV_PRES', 'BUNR_1_PRV_PRES'
                    ], setBurnerPressureData),
                    fetchData(['LPG_LINE_A_PRESS', 'LPG_LINE_B_PRESS'], setPerformanceData)
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();

        if (refreshRate > 0) {
            const interval = setInterval(fetchAllData, refreshRate);
            return () => clearInterval(interval);
        }
    }, [refreshRate, timeRange]);

    // Chart configurations
    const charts = [
        {
            title: "Gas Line HP",
            data: basicMetricsData,
            yAxisLabel: "Value"
        },
        {
            title: "Air Flow",
            data: airFlowData,
            yAxisLabel: "RPM"
        },
        {
            title: "Top Temperature Sensors",
            data: topTempData,
            yAxisLabel: "Temperature (°C)"
        },
        {
            title: "Bottom Temperature Sensors",
            data: bottomTempData,
            yAxisLabel: "Temperature (°C)"
        },
        {
            title: "Burner Pressures",
            data: burnerPressureData,
            yAxisLabel: "Pressure (kg/cm²)"
        },
        {
            title: "LPG Pressures",
            data: performanceData,
            yAxisLabel: "Pressure (kg/cm²)"
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 transition-all duration-300">
                {/* Top Header */}
                <div className="bg-white shadow-sm p-2 sticky top-0 z-20 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Furnace Control Dashboard</h1>
                    <div className="relative">
                        <button
                            onClick={() => setIsRefreshDropdownOpen(!isRefreshDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border hover:bg-gray-50"
                        >
                            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                            <span>{refreshOptions.find(opt => opt.value === refreshRate)?.label || 'Refresh'}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {isRefreshDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                {refreshOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setRefreshRate(option.value);
                                            setIsRefreshDropdownOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-4 space-y-6 overflow-auto">
                    {/* Machine Details and Overview Cards Row */}
                    <div className="flex flex-wrap lg:flex-nowrap gap-2">
                        {/* Machine Details Card */}
                        <div className="w-full lg:w-1/6 bg-white rounded-lg shadow-md flex flex-col justify-between">
                            <InfoCard
                                machineData={machineData}
                                onOpenRejectionForm={() => setIsRejectionFormOpen(true)}
                            />
                        </div>

                        {/* Overview Cards */}
                        {overviewCards.map((item, index) => (
                            <div
                                key={index}
                                className={`w-full lg:w-1/6 bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border-l-4
                                    ${item.color === 'green' ? 'border-[#00DD6E]' : 'border-orange-500'}`}
                            >
                                <div className='flex flex-col items-center justify-center'>
                                    <h2 className="text-gray-500 text-lg">{item.label}</h2>
                                    <div className="mt-2 text-3xl font-bold text-gray-800">
                                        {item.value}
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center items-center space-x-2">
                                    <button
                                        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 
                                            ${item.change === "increase" ? "border-green-500" : "border-red-500"} bg-white`}
                                    >
                                        {item.change === "increase" ? "↑" : "↓"}
                                    </button>
                                    <span className={`text-sm ${item.change === "increase" ? "text-green-500" : "text-red-500"
                                        }`}>
                                        {item.change === "increase" ? "+5%" : "-5%"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SVG Image */}
                    <div className="bg-gray-200 rounded-lg shadow-md p-4">
                        <div className="w-full h-[400px] flex justify-center items-center p-2">
                            <SvgImage data={svgData} />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {dashboardStats.map((stat, index) => (
                            <DashboardInfoCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-lg shadow-md">
                        <DataTable data={alarmData} />
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {charts.map((chart, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md">
                                <ChartCard
                                    title={chart.title}
                                    timeRange={timeRange}
                                    onTimeRangeChange={setTimeRange}
                                >
                                    <LineChart
                                        data={chart.data}
                                        title={chart.title}
                                        yAxisLabel={chart.yAxisLabel}
                                    />
                                </ChartCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rejection Form Modal */}
            <RejectionForm
                isOpen={isRejectionFormOpen}
                onClose={() => setIsRejectionFormOpen(false)}
            />
        </div>
    );
};

export default PlantDashboard;