export type BaseEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  deletedAt?: string | null;
};
