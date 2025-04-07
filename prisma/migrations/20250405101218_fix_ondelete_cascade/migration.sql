-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_folderId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
