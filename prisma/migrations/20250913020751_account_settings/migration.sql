-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT,
    "ip" TEXT,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PrivacySettings" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "showFullName" BOOLEAN NOT NULL DEFAULT false,
    "showNeighborhood" BOOLEAN NOT NULL DEFAULT true,
    "messagesFromVerifiedOnly" BOOLEAN NOT NULL DEFAULT true,
    "shareEmailWithMatches" BOOLEAN NOT NULL DEFAULT false,
    "sharePhoneWithMatches" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Lisbon',
    CONSTRAINT "PrivacySettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NotificationSettings" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "channelEmail" BOOLEAN NOT NULL DEFAULT true,
    "channelPush" BOOLEAN NOT NULL DEFAULT true,
    "channelInApp" BOOLEAN NOT NULL DEFAULT true,
    "bookingUpdates" TEXT NOT NULL DEFAULT 'mandatory',
    "messages" TEXT NOT NULL DEFAULT 'on',
    "verificationSafety" TEXT NOT NULL DEFAULT 'on',
    "matchSuggestions" TEXT NOT NULL DEFAULT 'digest_weekly',
    "fundDigest" TEXT NOT NULL DEFAULT 'off',
    "productNews" TEXT NOT NULL DEFAULT 'off',
    "policyChanges" TEXT NOT NULL DEFAULT 'mandatory',
    "quietHoursStart" TEXT NOT NULL DEFAULT '22:00',
    "quietHoursEnd" TEXT NOT NULL DEFAULT '08:00',
    CONSTRAINT "NotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
