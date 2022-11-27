-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "moviesId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    CONSTRAINT "Tags_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tags_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
