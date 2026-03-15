import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/libs/Common/api/admins";

const ADMINS_QUERY_KEY = ["admins"];

export const useAdmins = () => {
  return useQuery({
    queryKey: ADMINS_QUERY_KEY,
    queryFn: async () => {
      const response = await adminService.listAdmins();
      const json = await response.json();
      return json.data;
    },
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: Parameters<typeof adminService.addAdmin>[0]) => {
      const response = await adminService.addAdmin(vars);
      const json = await response.json();
      return json as { message: string, data: { admin: any, generatedPassword: string } };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEY });
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await adminService.deleteAdmin(id);
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to delete admin');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEY });
    },
  });
};
