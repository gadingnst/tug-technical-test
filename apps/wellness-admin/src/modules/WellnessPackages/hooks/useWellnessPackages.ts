import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wellnessService } from "@/libs/Common/api/wellness";
import { type WellnessPackage } from "@wellness/shared-typescript";

const WELLNESS_PACKAGES_QUERY_KEY = ["wellnessPackages"];

export const useWellnessPackages = () => {
  return useQuery({
    queryKey: WELLNESS_PACKAGES_QUERY_KEY,
    queryFn: async (): Promise<WellnessPackage[]> => {
      const response = await wellnessService.getAll();
      const json = await response.json();
      return json as WellnessPackage[];
    },
  });
};

export const useCreateWellnessPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: Parameters<typeof wellnessService.create>[0]) => {
      const response = await wellnessService.create(vars);
      const json = await response.json();
      return json as WellnessPackage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLNESS_PACKAGES_QUERY_KEY });
    },
  });
};

export const useUpdateWellnessPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Parameters<typeof wellnessService.update>[1] }) => {
      const response = await wellnessService.update(id, data);
      const json = await response.json();
      return json as WellnessPackage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLNESS_PACKAGES_QUERY_KEY });
    },
  });
};

export const useDeleteWellnessPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await wellnessService.delete(id);
      const json = await response.json();
      return json as WellnessPackage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLNESS_PACKAGES_QUERY_KEY });
    },
  });
};
