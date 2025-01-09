
import React, { useState, useEffect } from 'react';
import { Thermometer, Gauge, Activity, RefreshCw, ChevronDown } from 'lucide-react';
import DashboardInfoCard from '../Charts/DescriptionCard';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import DataTable from '../Charts/DataTable';
import InfoCard from '../Charts/InfoCard';
import SvgImage from '../Charts/SvgImage';
import RejectionForm from '../RejectionForm/form';
import { getHistorialData } from '@/WebServices/ApiControllers';
import ChartCard from '../ChartCard/ChartCard';

const Dashboard = ({ params }) => {
    const [isRejectionFormOpen, setIsRejectionFormOpen] = useState(false);
    const [voltageData, setVoltageData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [voltageTimeRange, setVoltageTimeRange] = useState('24h');
    const [currentTimeRange, setCurrentTimeRange] = useState('24h');
    const [refreshRate, setRefreshRate] = useState(0);
    const [isRefreshDropdownOpen, setIsRefreshDropdownOpen] = useState(false);

    const resolvedParams = React.use(params);
    const furnaceId = resolvedParams?.furnace || 'furnace1';

    const refreshOptions = [
        { label: 'Now', value: 0 },
        { label: '5 seconds', value: 5000 },
        { label: '30 seconds', value: 30000 },
        { label: '1 minute', value: 60000 },
    ];

    const machineData = {
        name: 'Shibaura SH-150TB',
        active: true,
        macId: 'sh150tb',
        macNo: 'TS - 01500790',
        macCf: '150/510 - 600, D40',
        moldId: 'front384',
        partNo: '900500011850',
        materialName: 'hips',
        heaterStatus: 'OFF'
    };

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
        }
    ];

    const dashboardData = {
        furnace1: {
            stats: [
                { title: 'Average Temperature', value: '850°C', trend: 5, icon: Thermometer, color: 'bg-red-500' },
                { title: 'Average Pressure', value: '2.4 kg/cm²', trend: -2, icon: Gauge, color: 'bg-blue-500' },
                { title: 'Efficiency', value: '92%', trend: 3, icon: Activity, color: 'bg-green-500' }
            ]
        }
    };

    const getTimeRangeInDays = (range) => {
        switch (range) {
            case '24h':
                return 1;
            case '3d':
                return 3;
            case '7d':
                return 7;
            default:
                return 1;
        }
    };

    const formatDate = (date) => {
        return date.toISOString().split('.')[0];
    };

    const fetchChartData = async (timeRange, dataType) => {
        try {
            setIsLoading(true);
            const now = new Date();
            const days = getTimeRangeInDays(timeRange);
            const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));

            const response = await getHistorialData({
                instanceId: "04a0a702-98c4-4fe6-a503-bb87e3a8bffc",
                variable: dataType,
                to: formatDate(now),
                from: formatDate(pastDate),
                frequency: "hour",
                limit: 1000
            });

            const transformedData = response.map(item => ({
                time: new Date(item.timestamp).toLocaleDateString(),
                value: item.value
            }));

            if (dataType === "Voltage") {
                setVoltageData(transformedData);
            } else {
                setCurrentData(transformedData);
            }
        } catch (error) {
            console.error(`Error fetching ${dataType} data:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle refresh rate changes
    useEffect(() => {
        if (refreshRate === 0) {
            // Fetch immediately for "Now" option
            fetchChartData(voltageTimeRange, "Voltage");
            fetchChartData(currentTimeRange, "Current");
            return;
        }

        const refreshInterval = setInterval(() => {
            fetchChartData(voltageTimeRange, "Voltage");
            fetchChartData(currentTimeRange, "Current");
        }, refreshRate);

        return () => clearInterval(refreshInterval);
    }, [refreshRate, voltageTimeRange, currentTimeRange]);

    const handleRefreshClick = () => {
        if (refreshRate === 0) {
            // Immediate refresh for "Now" option
            fetchChartData(voltageTimeRange, "Voltage");
            fetchChartData(currentTimeRange, "Current");
        }
        setIsRefreshDropdownOpen(!isRefreshDropdownOpen);
    };

    const data = dashboardData[furnaceId] || dashboardData.furnace1;
    const furnaceNumber = furnaceId.replace('furnace', '');

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-center font-bold">
                    {/* Furnace {furnaceNumber} Dashboard */}
                    Furnace Operational Details
                </h1>

                <div className="relative z-50">
                    <button
                        onClick={handleRefreshClick}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg border hover:bg-gray-50 space-x-2"
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

            {/* Rest of the dashboard components remain unchanged */}
            <div className="flex gap-4">
                <div className="w-1/4 min-w-[400px]">
                    <InfoCard
                        machineData={machineData}
                        onOpenRejectionForm={() => setIsRejectionFormOpen(true)}
                    />
                </div>

                <div className="flex-1">
                    <SvgImage data={voltageData} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.stats.map((stat, index) => (
                    <DashboardInfoCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChartCard
                    title="Temperature Trends"
                    timeRange={voltageTimeRange}
                    onTimeRangeChange={setVoltageTimeRange}
                >
                    <BarChart
                        data={voltageData}
                        title="Voltage Trends"
                        yAxisLabel="Temp (°C)"
                    />
                </ChartCard>

                <ChartCard
                    title="Pressure Trends"
                    timeRange={currentTimeRange}
                    onTimeRangeChange={setCurrentTimeRange}
                >
                    <LineChart
                        data={currentData}
                        title="Current Trends"
                        yAxisLabel="Pressure (kg/cm²)"
                    />
                </ChartCard>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <DataTable data={dataTable} />
            </div>

            <RejectionForm
                isOpen={isRejectionFormOpen}
                onClose={() => setIsRejectionFormOpen(false)}
            />
        </div>
    );
};

export default Dashboard;