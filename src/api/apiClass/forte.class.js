import axios from "../axiosConfig/axios";
import endpoints from "../endpoints/endpoints";

export const createUser = async (payload) => {
  try {
    return await axios.post(endpoints.CreateUser, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(endpoints.getUsers);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const contactUs = async (payload) => {
  try {
    return await axios.post(endpoints.contactUs, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const tutorial = async () => {
  try {
    return await axios.get(endpoints.tutorial);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addWard = async (payload) => {
  try {
    return await axios.post(endpoints.addWard, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateProfile = async (payload) => {
  try {
    return await axios.post(endpoints.updateProfile, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getCreateAuditData = async () => {
  try {
    return await axios.get(endpoints.getCreateAuditData);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getWards = async () => {
  try {
    return await axios.get(endpoints.getWards);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUserWards = async () => {
  try {
    return await axios.get(endpoints.getUserWards);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const createAudit = async (payload) => {
  try {
    return await axios.post(endpoints.createAudit, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const forgot_password = async (payload) => {
  try {
    return await axios.post(endpoints.forgot_password, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const forgot_password_code = async (payload) => {
  try {
    return await axios.post(endpoints.forgot_password_code, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const new_password = async (payload) => {
  try {
    return await axios.post(endpoints.new_password, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const get_audit_site = async () => {
  try {
    return await axios.get(endpoints.get_audit_site);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const perform_audit = async (payload) => {
  try {
    return await axios.get(`${endpoints.perform_audit}?id=${payload}`);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const user_audit = async (payload) => {
  try {
    return await axios.post(endpoints.user_audit, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const superuser_audit_result = async () => {
  try {
    return await axios.get(endpoints.superuser_audit_result);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const user_audit_result = async () => {
  try {
    return await axios.get(endpoints.user_audit_result);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
