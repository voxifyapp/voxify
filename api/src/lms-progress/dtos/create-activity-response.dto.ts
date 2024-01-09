import { ActivityResponseResultType } from 'src/lms-progress/entities/activity-response.entity';
import { z } from 'zod';

export const createActivityResponseDtoSchema = z.object({
  activityId: z.string().uuid(),
  lessonResponseId: z.string().uuid(),
  result: z.nativeEnum(ActivityResponseResultType),
  responseData: z.any(),
  timeTaken: z.number(),
});

export type CreateActivityResponseDto = z.infer<
  typeof createActivityResponseDtoSchema
>;
