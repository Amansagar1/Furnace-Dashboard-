import Cookies from "js-cookie";
import EndPoints from "./ApiEndpoints";
import axios from "axios";

// Create axios instance with interceptors for authentication
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        const tenantId = Cookies.get("tenantId");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if (tenantId) {
            config.headers["Tenant-ID"] = tenantId;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = (`${process.env.NEXT_PUBLIC_PROD_BASE_URL}/sessionexpierd`);
        }
        return Promise.reject(error);
    }
);


export const getHistorialData = async ({
    instanceId,
    variable,
    to,
    from,
    frequency = 'hour',
    limit = 1000
}) => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(
            EndPoints.GET_HISTORIAL_DATA(
                tenantId,
                instanceId,
                variable,
                to,
                from,
                frequency,
                limit
            )
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Invalid token', e);
        return null;
    }
};

export const getVariableLastValue = async ({
    instanceId,
    dataModel,
    variableName
}) => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(
            EndPoints.GET_VARIABLE_LAST_VALUE(
                tenantId,
                instanceId,
                dataModel,
                variableName
            )
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getDataApi = async ({
    include_instanceId = true,
    include_dataModel = true,
    include_edgeId = true,
    asc = false,
    from,
    to,
    limit = 10
}) => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(
            EndPoints.GET_DATA_API(
                tenantId,
                include_instanceId,
                include_dataModel,
                include_edgeId,
                asc,
                to,
                from,
                limit
            )
        );
        console.log("getvalue", response.data)
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const dataValue = async ({
    limit
}) => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(
            EndPoints.DATA_VALUE(
                tenantId, limit
            )
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Helper function to handle API errors
export const handleApiError = (error) => {
    const errorMessage =
        error.response?.data?.errorCode + " " + error.response?.data?.message ||
        error.message;
    console.log("Error: " + errorMessage);
    throw { statusCode: error.response?.status, errorMessage };
};