import { authAxios } from '@voxify/axiosClient';
import { UnitResponseEntity } from '@voxify/types/lms-progress/unit-response';

export type CreateUnitResponsePostData = Pick<UnitResponseEntity, 'unitId'>;

export const GET_UNIT_RESPONSE = 'GET_UNIT_RESPONSE';
export const getUnitResponse = async (): Promise<UnitResponseEntity[]> => {
  return (await authAxios.get('/lms-progress/unit-responses')).data;
};

export const createUnitResponse = async (
  data: CreateUnitResponsePostData,
): Promise<UnitResponseEntity> => {
  return (await authAxios.post('/lms-progress/unit-responses', data)).data;
};
