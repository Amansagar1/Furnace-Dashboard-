"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Pagination from './pagination';
import { getHistorialData } from '../../WebServices/ApiControllers';
import { Download, Filter, RefreshCw } from 'lucide-react';

const ReportPage = () => {
    const [filters, setFilters] = useState({
        instanceId: '',
        variable: 'Voltage',
        from: '',
        to: '',
        frequency: 'hour',
    });

    const [uiFilters, setUiFilters] = useState({
        parameters: '',
        shift: '',
        fullDate: ''
    });

    const frequencyOptions = [
        { value: 'second', label: 'Second' },
        { value: 'minute', label: 'Minute' },
        { value: 'hour', label: 'Hour' },
        { value: 'day', label: 'Day' }
    ];

    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 100;

    const downloadCSV = () => {
        if (!responseData || !responseData.rows.length) return;

        const csvHeader = responseData.headers.join(',') + '\n';
        const csvRows = responseData.rows.map(row =>
            row.map(cell => {
                if (cell && cell.toString().includes(',')) {
                    return `"${cell}"`;
                }
                return cell;
            }).join(',')
        ).join('\n');
        const csvContent = csvHeader + csvRows;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `data.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFilterChange = (field, value) => {
        if (['parameters', 'shift', 'fullDate'].includes(field)) {
            setUiFilters(prev => ({ ...prev, [field]: value }));
        } else {
            setFilters(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        const tenantId = Cookies.get("tenantId");

        if (!tenantId) {
            setError("No tenantId found");
            setLoading(false);
            return;
        }

        try {
            const apiParams = {
                tenantId,
                ...filters,
                limit: 1000
            };

            const results = await getHistorialData(apiParams);
            const transformedData = transformDataForTable(results);
            const filteredData = applyUiFilters(transformedData);

            setResponseData(filteredData);
            setTotalPages(Math.ceil(filteredData.rows.length / itemsPerPage));
            setCurrentPage(1);
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const applyUiFilters = (data) => {
        let filteredRows = [...data.rows];

        if (uiFilters.parameters) {
            filteredRows = filteredRows.filter(row =>
                row[0].toLowerCase().includes(uiFilters.parameters.toLowerCase())
            );
        }

        if (uiFilters.shift) {
            const shiftHours = {
                'Shift 1': [0, 8],
                'Shift 2': [8, 16],
                'Shift 3': [16, 24]
            };
            const [start, end] = shiftHours[uiFilters.shift] || [0, 24];

            filteredRows = filteredRows.filter(row => {
                const hour = new Date(row[1]).getHours();
                return hour >= start && hour < end;
            });
        }

        return {
            headers: data.headers,
            rows: filteredRows
        };
    };

    const transformDataForTable = (data) => {
        if (!Array.isArray(data) || data.length === 0) return { headers: [], rows: [] };

        const headers = ['Variable', 'Timestamp', 'Value', 'Instance Name'];
        const rows = data.map(item => [
            item.variable,
            item.timestamp,
            item.value,
            item.instancename
        ]);

        return { headers, rows };
    };

    const currentPageData = responseData ? {
        headers: responseData.headers,
        rows: responseData.rows.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
    } : null;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg">
                <div className="p-4">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Filters Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
                        {/* Instance ID */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Instance ID</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filters.instanceId}
                                onChange={(e) => handleFilterChange('instanceId', e.target.value)}
                            >
                                <option value="">Select instanceId</option>
                                <option value="04a0a702-98c4-4fe6-a503-bb87e3a8bffc">04a0a702-98c4-4fe6-a503-bb87e3a8bffc</option>
                                <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">40ce6095-84c2-49a5-b5aa-c2f37ebdd40c</option>
                            </select>
                        </div>

                        {/* Variable */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Variable</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filters.variable}
                                onChange={(e) => handleFilterChange('variable', e.target.value)}
                            >
                                <option value="">Select variable</option>
                                <option value="Variable">Variable</option>
                                <option value="Current">Current</option>
                                <option value="AIR_FLOW_RPM">AIR_FLOW_RPM</option>
                                <option value="AIR_FLOW_RPM">RTD_1_TOP_TEMP</option>
                                <option value="AIR_FLOW_RPM">RTD_1_BTM_TEMP</option>
                            </select>
                        </div>

                        {/* Parameters */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Parameters</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={uiFilters.parameters}
                                onChange={(e) => handleFilterChange('parameters', e.target.value)}
                            >
                                <option value="">Select Parameters</option>
                                <option value="param1">Parameter 1</option>
                                <option value="param2">Parameter 2</option>
                            </select>
                        </div>

                        {/* Shift */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Shift</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={uiFilters.shift}
                                onChange={(e) => handleFilterChange('shift', e.target.value)}
                            >
                                <option value="">Select Shift</option>
                                <option value="Shift 1">Shift 1</option>
                                <option value="Shift 2">Shift 2</option>
                                <option value="Shift 3">Shift 3</option>
                            </select>
                        </div>

                        {/* Frequency */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Frequency</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filters.frequency}
                                onChange={(e) => handleFilterChange('frequency', e.target.value)}
                            >
                                {frequencyOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Filters */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filters.from}
                                onChange={(e) => handleFilterChange('from', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={filters.to}
                                onChange={(e) => handleFilterChange('to', e.target.value)}
                            />
                        </div>

                        {/* <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Full Date</label>
                            <input
                                type="date"
                                className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={uiFilters.fullDate}
                                onChange={(e) => handleFilterChange('fullDate', e.target.value)}
                            />
                        </div> */}
                    </div>

                    {/* Buttons Section */}
                    <div className="flex justify-end items-end mb-6">
                        <div className="flex gap-4">
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Filter className="h-4 w-4" />
                                )}
                                {loading ? "Loading..." : "Apply Filters"}
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm"
                                onClick={downloadCSV}
                                disabled={!responseData || responseData.rows.length === 0}
                            >
                                <Download className="h-4 w-4" />
                                Download CSV
                            </button>
                        </div>
                    </div>

                    {/* Table Section */}
                    {currentPageData && (
                        <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {currentPageData.headers.map((header, index) => (
                                                <th
                                                    key={index}
                                                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentPageData.rows.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="hover:bg-gray-50">
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {responseData && responseData.rows.length > 0 && (
                        <div className="mt-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                dataToDownload={responseData.rows}
                            />
                        </div>
                    )}

                    {responseData && responseData.rows.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No data available.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportPage;