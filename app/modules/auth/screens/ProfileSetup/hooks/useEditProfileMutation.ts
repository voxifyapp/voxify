import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  editProfile,
} from '@voxify/api/auth/profile';

export const useEditProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FETCH_OR_CREATE_PROFILE_QUERY],
      });
    },
  });
};
