# Migration `20201105105052`

This migration has been generated at 11/5/2020, 11:50:52 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."friendShips" ADD COLUMN "usersId" integer   

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

DROP TABLE "public"."statuses"

ALTER TABLE "public"."friendShips" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105104842..20201105105052
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
@@ -23,20 +23,24 @@
     chatId   Int?
 }
 model users {
-    id                Int        @id @default(autoincrement())
+    id                Int           @id @default(autoincrement())
     displayName       String
-    email             String     @unique
+    email             String        @unique
     password          String
     profilePictureUrl String
-    status            statuses   @default(value: OFFLINE)
-    chats             chats[]    @relation(name: "ChatUsers")
+    status            statuses      @default(value: OFFLINE)
+    chats             chats[]       @relation(name: "ChatUsers")
     message           messages[]
-    friends           users[]    @relation(name: "FriendRelation")
+    friendShips       friendShips[]
+}
-    users      users? @relation("FriendRelation", fields: [idAsFriend], references: [id])
-    idAsFriend Int?
+model friendShips {
+    id Int @id @default(autoincrement())
+
+    users   users? @relation(fields: [usersId], references: [id])
+    usersId Int?
 }
 enum friendShipRequestStatus {
     PENDING
```


