import { Prisma } from '@prisma/client';

export interface PostFilter {
  id?: string;
  title?: string;
}

export function postFilterToPrismaFilter(filter: PostFilter): Prisma.PostWhereInput | undefined {
  if (! filter) {
    return undefined;
  }

  let prismaFilter: Prisma.PostWhereInput = {};

  if (filter.title) {
    prismaFilter = { title: filter.title };
  }

  return prismaFilter;
}