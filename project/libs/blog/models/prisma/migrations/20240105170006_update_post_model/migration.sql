/*
  Warnings:

  - You are about to drop the column `content_entity_id` on the `posts` table. All the data in the column will be lost.
  - The `status` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `text_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('text', 'link', 'quote', 'photo', 'video');

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content_entity_id",
ADD COLUMN     "preview" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "text" TEXT,
ADD COLUMN     "title" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'published',
DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'text';

-- DropTable
DROP TABLE "text_posts";
