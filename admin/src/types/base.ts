export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  deletedAt?: string | null;
};
