/*
  Warnings:

  - You are about to drop the `_TaskToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_B_fkey";

-- DropTable
DROP TABLE "_TaskToUser";

-- CreateTable
CREATE TABLE "UserTasks" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTasks" ADD FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTasks" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
