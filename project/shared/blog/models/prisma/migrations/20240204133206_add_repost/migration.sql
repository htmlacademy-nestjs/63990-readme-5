-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isRepost" BOOLEAN,
ADD COLUMN     "originalId" TEXT,
ADD COLUMN     "original_user_id" TEXT;
