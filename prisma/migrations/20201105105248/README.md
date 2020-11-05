# Migration `20201105105248`

This migration has been generated at 11/5/2020, 11:52:48 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."_UserFollows" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."friendShips"

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "public"."_UserFollows"("A", "B")

CREATE INDEX "_UserFollows_B_index" ON "public"."_UserFollows"("B")

ALTER TABLE "public"."_UserFollows" ADD FOREIGN KEY("A")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_UserFollows" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105105052..20201105105248
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
@@ -23,26 +23,20 @@
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
-    friendShips       friendShips[]
+    followedBy        users[]    @relation("UserFollows", references: [id])
+    following         users[]    @relation("UserFollows", references: [id])
 }
-model friendShips {
-    id Int @id @default(autoincrement())
-
-    users   users? @relation(fields: [usersId], references: [id])
-    usersId Int?
-}
-
 enum friendShipRequestStatus {
     PENDING
     ACCEPTED
     REJECTED
```


