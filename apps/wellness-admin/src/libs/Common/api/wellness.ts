import BaseHttp from "@/libs/BaseHttp";
import { CORE_API_BASE_URL } from "@/configs/envs";

const wellnessApi = new BaseHttp({
  baseURL: CORE_API_BASE_URL
});

export default wellnessApi;
