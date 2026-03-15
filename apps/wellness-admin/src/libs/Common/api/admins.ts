import BaseHttp from "@/libs/BaseHttp";
import { CORE_API_BASE_URL } from "@/configs/envs";
import { type AddAdminInput, type AdminListResponse, type AddAdminResponse } from "@wellness/shared-typescript";
import { handleResponse } from "@/libs/Common/helpers/api.helper";

const adminApiBase = new BaseHttp({
  baseURL: CORE_API_BASE_URL,
  credentials: 'include'
});

export const addAdmin = (data: AddAdminInput) =>
  handleResponse<AddAdminResponse>(
    adminApiBase.post('/admin/admins', { body: JSON.stringify(data) })
  );

export const listAdmins = () =>
  handleResponse<AdminListResponse>(adminApiBase.get('/admin/admins'));

export const deleteAdmin = (id: string | number) =>
  handleResponse<{ message: string }>(adminApiBase.delete(`/admin/admins/${id}`));

const adminApi = {
  addAdmin,
  listAdmins,
  deleteAdmin,
}

export default adminApi;
