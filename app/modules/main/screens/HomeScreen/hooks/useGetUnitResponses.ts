import { useQuery } from '@tanstack/react-query';
import {
  getUnitResponse,
  GET_UNIT_RESPONSE,
} from '@voxify/api/lms-progress/unit-response';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';
import { useEffect } from 'react';

export const useGetUnitResponses = () => {
  const { setCompletedUnits } = useProfileProgressStore();

  const mutation = useQuery({
    queryFn: getUnitResponse,
    queryKey: [GET_UNIT_RESPONSE],
  });

  const unitResponses = mutation.data;

  useEffect(() => {
    !!unitResponses &&
      setCompletedUnits(
        new Set<string>(unitResponses.map(unitResponse => unitResponse.unitId)),
      );
  }, [setCompletedUnits, unitResponses]);

  return mutation;
};
