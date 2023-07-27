import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Use this on controllers that do not require authentication
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const DOES_NOT_REQUIRE_PROFILE_KEY = 'doesNotRequireProfile';
/**
 * Use this on controllers that do not require a profile with the user
 */
export const DoesNotRequireProfile = () =>
  SetMetadata(DOES_NOT_REQUIRE_PROFILE_KEY, true);
