"use client";

import { Variable } from "lucide-react";

const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        console.log(
            "Window defined",
            `${window.location.protocol}//${window.location.host}`
        );
        return `${window.location.protocol}//${window.location.host}/`;
    }
    console.log("Window not defined");

    return "";
};

// const BASE_URL = getBaseUrl();

const BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;

const EndPoints = {
    GET_HISTORIAL_DATA: (tenantId, instanceId, variable, to, from, frequency, limit) =>
        BASE_URL + `/dataapi/api/v1/DataApi/GetHistorialData?tenantId=${tenantId}&instanceId=${instanceId}&variable=${variable}&to=${to}&from=${from}&frequency=${frequency}&limit=${limit}`,

    GET_VARIABLE_LAST_VALUE: (tenantId, instanceId, dataModel, variableName) =>
        BASE_URL + `/dataapi/api/v1/DataApi/GetVariableLastValue?tenantId=${tenantId}&instanceId=${instanceId}&dataModel=${dataModel}&variableName=${variableName}`,
};

Object.freeze(EndPoints);

export default EndPoints;
