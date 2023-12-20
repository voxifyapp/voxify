import {
  CreateUnitResponsePostData,
  createUnitResponse,
} from '@voxify/api/lms-progress/unit-response';
import { useMutation } from 'react-query';

export const useCreateUnitResponse = () => {
  return useMutation((data: CreateUnitResponsePostData) => {
    return createUnitResponse({ ...data });
  });
};
