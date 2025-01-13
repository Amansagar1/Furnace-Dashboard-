"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Pagination from './pagination';
import { dataValue } from '../../WebServices/ApiControllers';

const DataExplorerPage = () => {
    // State for filters
    const [filters, setFilters] = useState({
        einstanceid: '',
        instanceid: '',
        classmodel: '',
        variable: '',
        limit: '100'
    });

    // State for dropdown options
    const [filterOptions, setFilterOptions] = useState({
        einstanceids: [],
        instanceids: [],
        classmodels: [],
        variables: []
    });

    // State for data and pagination
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 100;

    // Function to fetch filter options
    const fetchFilterOptions = async () => {
        try {
            // Assuming you have these API endpoints
            const [einstanceResponse, instanceResponse, classModelResponse] = await Promise.all([
                dataValue({ type: 'einstanceids' }),
                dataValue({ type: 'instanceids' }),
                dataValue({ type: 'classmodels' })
            ]);

            setFilterOptions({
                einstanceids: einstanceResponse || [],
                instanceids: instanceResponse || [],
                classmodels: classModelResponse || [],
                variables: [] // This will be populated when classmodel is selected
            });
        } catch (error) {
            setError("Error fetching filter options");
        }
    };

    // Fetch filter options on component mount
    useEffect(() => {
        fetchFilterOptions();
    }, []);

    // Fetch variables when classmodel changes
    useEffect(() => {
        if (filters.classmodel) {
            dataValue({ type: 'variables', classmodel: filters.classmodel })
                .then(variables => {
                    setFilterOptions(prev => ({ ...prev, variables: variables || [] }));
                })
                .catch(error => {
                    setError("Error fetching variables");
                });
        }
    }, [filters.classmodel]);

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
        // Reset dependent fields
        if (field === 'classmodel') {
            setFilters(prev => ({ ...prev, variable: '' }));
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
            const results = await dataValue(filters, parseInt(filters.limit) || 100);

            // Transform data for table display
            const transformedData = transformDataForTable(results);
            setResponseData(transformedData);
            setTotalPages(Math.ceil(results.length / itemsPerPage));
            setCurrentPage(1);
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    // Transform API response data for table display
    const transformDataForTable = (data) => {
        if (!Array.isArray(data) || data.length === 0) return { headers: [], rows: [] };

        // Extract all unique timestamps
        const timestamps = [...new Set(data.map(item => item.timestamp))].sort();

        // Create rows with variable values mapped to timestamps
        const variableMap = {};
        data.forEach(item => {
            if (!variableMap[item.variable]) {
                variableMap[item.variable] = {};
            }
            variableMap[item.variable][item.timestamp] = item.value;
        });

        // Create table headers and rows
        const headers = ['Variable', ...timestamps];
        const rows = Object.entries(variableMap).map(([variable, values]) => {
            return [
                variable,
                ...timestamps.map(timestamp => values[timestamp] || '-')
            ];
        });

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
        <div className="text-[12px] w-full text-black h-screen pb-60">
            {/* <h1 className="font-bold text-[16px] p-2 pl-4 bg-[#F7F4F4] flex items-center">
                Data Explorer
            </h1> */}

            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="border-gray-300 p-4 w-full">
                <div className="grid grid-cols-8 gap-4">
                    <div className="flex flex-col gap-2">
                        <label>Select Assets</label>
                        <select
                            className="p-2 border rounded"
                            value={filters.einstanceid}
                            onChange={(e) => handleFilterChange('einstanceid', e.target.value)}
                        >
                            <option value="">Select Assets</option>
                            {filterOptions.einstanceids.map(id => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Select Parameters</label>
                        <select
                            className="p-2 border rounded"
                            value={filters.instanceid}
                            onChange={(e) => handleFilterChange('instanceid', e.target.value)}
                        >
                            <option value="">Select Parameters</option>
                            {filterOptions.instanceids.map(id => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Select Variable</label>
                        <select
                            className="p-2 border rounded"
                            value={filters.classmodel}
                            onChange={(e) => handleFilterChange('classmodel', e.target.value)}
                        >
                            <option value="">Select Variable</option>
                            {filterOptions.classmodels.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Select Shift</label>
                        <select
                            className="p-2 border rounded"
                            value={filters.variable}
                            onChange={(e) => handleFilterChange('variable', e.target.value)}
                            disabled={!filters.classmodel}
                        >
                            <option value="">Select Shift</option>
                            <option >Shift 1</option>
                            <option >Shift 2</option>
                            <option >Shift 3</option>
                            {/* {filterOptions.variables.map(variable => (
                                // 8 hrs of each shift 
                                <option key={variable} value={variable}>Shift 1</option>
                                // <option value={variable}>Shift 2</option>
                                // <option value={variable}>Shift 3</option>
                            ))} */}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Frequency</label>
                        <input
                            type="number"
                            className="p-2 border rounded"
                            value={filters.limit}
                            onChange={(e) => handleFilterChange('limit', e.target.value)}
                            placeholder="Ex - 10000"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Start Date</label>
                        <input
                            type="date"
                            className="p-2 border rounded"
                            value={filters.limit}
                            onChange={(e) => handleFilterChange('limit', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>End Date</label>
                        <input
                            type="date"
                            className="p-2 border rounded"
                            value={filters.limit}
                            onChange={(e) => handleFilterChange('limit', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Full Date</label>
                        <input
                            type="date"
                            className="p-2 border rounded"
                            value={filters.limit}
                            onChange={(e) => handleFilterChange('limit', e.target.value)}
                        />
                    </div>
                </div>

                <div className="right-4 mt-4">
                    <button
                        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </div>

            {currentPageData && (
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                {currentPageData.headers.map((header, index) => (
                                    <th key={index} className="border border-gray-300 p-2 bg-gray-100">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border border-gray-300 p-2">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {responseData && responseData.rows.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    dataToDownload={responseData.rows}
                />
            )}

            {responseData && responseData.rows.length === 0 && (
                <p className="mt-5 text-center">No data available.</p>
            )}
        </div>
    );
};

export default DataExplorerPage;