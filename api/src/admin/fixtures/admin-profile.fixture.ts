import { Factory } from 'fishery';
import { AdminProfile } from 'src/admin/entities/admin-profile.entity';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import { getRepository } from 'test/utils/typeorm';

export const adminProfileFactory = Factory.define<AdminProfile>(
  ({ onCreate }) => {
    onCreate(async (profile) => {
      const profileRepo = await getRepository(AdminProfile);
      return profileRepo.save(
        {
          ...profile,
          userId: profile.userId
            ? profile.userId
            : (await firebaseUserFactory.create()).uid,
        },
        { reload: true },
      );
    });

    return {
      ...baseFactory.build(),
      userId: undefined,
    };
  },
);
