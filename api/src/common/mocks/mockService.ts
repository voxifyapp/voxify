/**
 * Mock common methods of a service
 */
export const mockService = (service) => {
  return {
    provide: service,
    useValue: {},
  };
};
