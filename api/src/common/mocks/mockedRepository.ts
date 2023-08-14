/**
 * Mock common methods of a repository
 */
export const mockRepository = (repository) => {
  return {
    provide: repository,
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      find: jest.fn(),
    },
  };
};
