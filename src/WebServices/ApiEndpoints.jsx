"use client";

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

    DATA_VALUE: (tenantId, limit) =>
        BASE_URL + `${SUBURL}GetDataValue?tenantId=${tenantId}&limit=${limit}`,

    GET_DATA_API: (tenantId, include_instanceId, include_dataModel, include_edgeId, asc, from, to, limit) =>
        BASE_URL + `/dataapi/api/v1/DataApi/GetValues?tenantId=${tenantId}&include_instanceId=${include_instanceId}&include_dataModel=${include_dataModel}&include_edgeId=${include_edgeId}&asc=${asc}&from=${from}&to=${to}&limit=${limit}`,
};

Object.freeze(EndPoints);

export default EndPoints;
