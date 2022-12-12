-- CreateTable
CREATE TABLE "UserPasswordCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passwordCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPasswordCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPasswordCode" ADD CONSTRAINT "UserPasswordCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
