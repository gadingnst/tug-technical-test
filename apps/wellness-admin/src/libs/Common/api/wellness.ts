import BaseHttp from "@/libs/BaseHttp";
import { CORE_API_BASE_URL } from "@/configs/envs";
import { 
  type CreateWellnessPackageInput, 
  type UpdateWellnessPackageInput, 
  type WellnessPackage 
} from "@wellness/shared-typescript";
import { handleResponse } from "@/libs/Common/helpers/api.helper";

const wellnessApiBase = new BaseHttp({
  baseURL: CORE_API_BASE_URL,
  credentials: 'include'
});

export const getAllWellnessPackages = () => 
  handleResponse<WellnessPackage[]>(wellnessApiBase.get('/admin/packages'));

export const createWellnessPackage = (data: CreateWellnessPackageInput) => 
  handleResponse<WellnessPackage>(wellnessApiBase.post('/admin/packages', { body: JSON.stringify(data) }));

export const updateWellnessPackage = (id: number, data: UpdateWellnessPackageInput) => 
  handleResponse<WellnessPackage>(wellnessApiBase.put(`/admin/packages/${id}`, { body: JSON.stringify(data) }));

export const deleteWellnessPackage = (id: number) => 
  handleResponse<void>(wellnessApiBase.delete(`/admin/packages/${id}`));

const wellnessApi = {
  getAllWellnessPackages,
  createWellnessPackage,
  updateWellnessPackage,
  deleteWellnessPackage,
};

export default wellnessApi;
