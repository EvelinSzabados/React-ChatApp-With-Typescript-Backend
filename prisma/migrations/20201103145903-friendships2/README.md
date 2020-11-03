# Migration `20201103145903-friendships2`

This migration has been generated at 11/3/2020, 3:59:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."friendShipRequest" (
"id" SERIAL,
"status" "friendShipRequestStatus"  NOT NULL DEFAULT E'PENDING',
"usersId" integer   NOT NULL ,
"usersId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_friendShipsTousers" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_friendShipsTousers_AB_unique" ON "public"."_friendShipsTousers"("A", "B")

CREATE INDEX "_friendShipsTousers_B_index" ON "public"."_friendShipsTousers"("B")

ALTER TABLE "public"."friendShipRequest" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."friendShipRequest" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_friendShipsTousers" ADD FOREIGN KEY("A")REFERENCES "public"."friendShips"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_friendShipsTousers" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201103145341-friendships..20201103145903-friendships2
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
@@ -22,24 +22,17 @@
     chat     chats? @relation(fields: [chatId], references: [id])
     chatId   Int?
 }
-model statuses {
-    id         Int     @id @default(autoincrement())
-    statusName String
-    user       users[]
-}
-
 model users {
     id                Int      @id @default(autoincrement())
     displayName       String
     email             String   @unique
     password          String
     profilePictureUrl String
-    status            statuses @relation(fields: [statusId], references: [id])
+    status            statuses @default(value: OFFLINE)
     chats     chats[]     @relation(name: "ChatUsers")
     message  messages[]
-    statusId Int
     friendships friendShips[]
     friendshipRequestsSent friendShipRequest[] @relation(name: "FriendshipRequestsSentRelation")
     friendshipRequestsReceived friendShipRequest[] @relation(name: "FriendshipRequestsReceivedRelation")
@@ -61,4 +54,10 @@
         PENDING
         ACCEPTED
         REJECTED
 }
+
+enum statuses {
+    OFFLINE
+    BUSY
+    AVAILABLE
+}
```


