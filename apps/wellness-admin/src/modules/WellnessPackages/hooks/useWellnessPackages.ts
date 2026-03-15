import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllWellnessPackages, 
  createWellnessPackage, 
  updateWellnessPackage, 
  deleteWellnessPackage 
} from "@/libs/Common/api/wellness";
import { type WellnessPackage } from "@wellness/shared-typescript";

const WELLNESS_PACKAGES_QUERY_KEY = ["wellnessPackages"];

export const useWellnessPackages = () => {
  return useQuery({
    queryKey: WELLNESS_PACKAGES_QUERY_KEY,
    queryFn: () => getAllWellnessPackages(),
  });
};

export const useCreateWellnessPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: Parameters<typeof createWellnessPackage>[0]) => createWellnessPackage(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLNESS_PACKAGES_QUERY_KEY });
    },
  });
};

export const useUpdateWellnessPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateWellnessPackage>[1] }) => 
      updateWellnessPackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLNESS_PACKAGES_QUERY_KEY });
    },
  });
};

export const useDeleteWellnessPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteWellnessPackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLNESS_PACKAGES_QUERY_KEY });
    },
  });
};
