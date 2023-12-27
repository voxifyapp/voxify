import {
  CreateUnitResponsePostData,
  createUnitResponse,
} from "@voxify/api/lms-progress/unit-response";
import { useMutation } from "@tanstack/react-query";

export const useCreateUnitResponse = () => {
  return useMutation({
    mutationFn: (data: CreateUnitResponsePostData) => {
      return createUnitResponse({ ...data });
    },
  });
};
