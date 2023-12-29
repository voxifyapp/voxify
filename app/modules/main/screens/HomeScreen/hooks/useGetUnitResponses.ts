import { useQuery } from '@tanstack/react-query';
import {
  GET_UNIT_RESPONSE,
  getUnitResponse,
} from '@voxify/api/lms-progress/unit-response';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';
import { useEffect } from 'react';

export const useGetUnitResponses = () => {
  const { markUnitsAsComplete } = useProfileProgressStore();

  const mutation = useQuery({
    queryFn: getUnitResponse,
    queryKey: [GET_UNIT_RESPONSE],
  });

  const unitResponses = mutation.data;

  useEffect(() => {
    !!unitResponses &&
      markUnitsAsComplete(
        unitResponses.map(unitResponse => unitResponse.unitId),
      );
  }, [markUnitsAsComplete, unitResponses]);

  return mutation;
};
