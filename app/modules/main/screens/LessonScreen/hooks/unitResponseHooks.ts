import { useMutation } from '@tanstack/react-query';
import {
  CreateUnitResponsePostData,
  createUnitResponse,
} from '@voxify/api/lms-progress/unit-response';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';

export const useCreateUnitResponse = () => {
  const markUnitsAsComplete = useProfileProgressStore(
    state => state.markUnitsAsComplete,
  );

  return useMutation({
    mutationFn: (data: CreateUnitResponsePostData) => {
      return createUnitResponse({ ...data });
    },
    onSuccess: unit => {
      markUnitsAsComplete([unit.id]);
    },
  });
};
