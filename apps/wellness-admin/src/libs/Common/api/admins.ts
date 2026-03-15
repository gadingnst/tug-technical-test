import BaseHttp from "@/libs/BaseHttp";
import { CORE_API_BASE_URL } from "@/configs/envs";
import { type AddAdminInput } from "@wellness/shared-typescript";

const adminApi = new BaseHttp({
  baseURL: CORE_API_BASE_URL,
  credentials: 'include'
});

export const adminService = {
  addAdmin: (data: AddAdminInput) => adminApi.post('/admin/admins', { body: JSON.stringify(data) }),
  listAdmins: () => adminApi.get('/admin/admins'),
};

export default adminApi;
