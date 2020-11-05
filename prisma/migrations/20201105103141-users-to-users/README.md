# Migration `20201105103141-users-to-users`

This migration has been generated at 11/5/2020, 11:31:41 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE',
ADD COLUMN "usersId" integer   

DROP TABLE "public"."friendShips"

DROP TABLE "public"."statuses"

ALTER TABLE "public"."users" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105102545..20201105103141-users-to-users
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -23,25 +23,22 @@
     chatId   Int?
 }
 model users {
-    id                Int           @id @default(autoincrement())
+    id                Int        @id @default(autoincrement())
     displayName       String
-    email             String        @unique
+    email             String     @unique
     password          String
     profilePictureUrl String
-    status            statuses      @default(value: OFFLINE)
-    chats             chats[]       @relation(name: "ChatUsers")
+    status            statuses   @default(value: OFFLINE)
+    chats             chats[]    @relation(name: "ChatUsers")
     message           messages[]
-    friendships       friendShips[] @relation(name: "FriendshipRelation")
+    friends           users[]    @relation("usersTousers")
+    users   users? @relation("usersTousers", fields: [usersId], references: [id])
+    usersId Int?
 }
-model friendShips {
-    id    Int     @id @default(autoincrement())
-    users users[] @relation("FriendshipRelation")
-}
-
 enum friendShipRequestStatus {
     PENDING
     ACCEPTED
     REJECTED
```


