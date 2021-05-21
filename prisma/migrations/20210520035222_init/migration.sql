-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "duedate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
