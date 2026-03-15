import BaseHttp from "@/libs/BaseHttp";
import { CORE_API_BASE_URL } from "@/configs/envs";
import { type CreateWellnessPackageInput, type UpdateWellnessPackageInput } from "@wellness/shared-typescript";

const wellnessApi = new BaseHttp({
  baseURL: CORE_API_BASE_URL,
  credentials: 'include'
});

export const wellnessService = {
  getAll: () => wellnessApi.get('/admin/packages'),
  create: (data: CreateWellnessPackageInput) => wellnessApi.post('/admin/packages', { body: JSON.stringify(data) }),
  update: (id: number, data: UpdateWellnessPackageInput) => wellnessApi.put(`/admin/packages/${id}`, { body: JSON.stringify(data) }),
  delete: (id: number) => wellnessApi.delete(`/admin/packages/${id}`),
};

export default wellnessApi;
