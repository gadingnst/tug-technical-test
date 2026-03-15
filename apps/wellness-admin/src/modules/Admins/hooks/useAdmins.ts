import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdmin, listAdmins, deleteAdmin } from "@/libs/Common/api/admins";

const ADMINS_QUERY_KEY = ["admins"];

export const useAdmins = () => {
  return useQuery({
    queryKey: ADMINS_QUERY_KEY,
    queryFn: () => listAdmins(),
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: Parameters<typeof addAdmin>[0]) => addAdmin(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEY });
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEY });
    },
  });
};
