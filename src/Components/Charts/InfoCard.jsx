import React from 'react';
import { Plus } from 'lucide-react';

const InfoCard = ({ machineData, onOpenRejectionForm }) => {
    const detailsData = [
        { label: 'Name', value: machineData.name },
        { label: 'Active', value: machineData.active ? '✓' : '✗' },
        { label: 'MAC ID', value: machineData.macId },
        { label: 'MAC No', value: machineData.macNo },
        // { label: 'MAC Cf', value: machineData.macCf },
        // { label: 'Mold ID', value: machineData.moldId },
        // { label: 'Part No', value: machineData.partNo },
        // { label: 'Material Name', value: machineData.materialName },
        // { label: 'Heater Status', value: machineData.heaterStatus }
    ];

    return (
        <div className=" bg-white rounded-lg shadow-md p-2 border">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Machine details</h2>
                <button
                    onClick={onOpenRejectionForm}
                    className="flex items-center border p-2 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Rejection
                </button>
            </div>

            <div className="space-y-2 text-xs">
                {detailsData.map((detail, index) => (
                    <div key={index} className="flex border-b py-1">
                        <span className="w-1/3 text-gray-600 font-bold">{detail.label}:</span>
                        <span className="w-2/3">{detail.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoCard;