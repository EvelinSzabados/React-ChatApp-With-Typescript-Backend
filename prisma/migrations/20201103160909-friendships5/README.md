# Migration `20201103160909-friendships5`

This migration has been generated at 11/3/2020, 5:09:09 PM.
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

CREATE TABLE "public"."_Friendship" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_Friendship_AB_unique" ON "public"."_Friendship"("A", "B")

CREATE INDEX "_Friendship_B_index" ON "public"."_Friendship"("B")

ALTER TABLE "public"."friendShipRequest" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."friendShipRequest" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("A")REFERENCES "public"."friendShips"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201103155412-friendships4..20201103160909-friendships5
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
@@ -43,12 +43,10 @@
 }
 model friendShipRequest {
         id Int @id @default(autoincrement())
-        senderId Int
-        sender users @relation(name: "FriendshipRequestsSentRelation", fields: [senderId], references: [id])
-        recieverId Int
-        reciever users @relation(name: "FriendshipRequestsReceivedRelation", fields: [recieverId], references: [id])
+        sender users @relation(name: "FriendshipRequestsSentRelation")
+        reciever users @relation(name: "FriendshipRequestsReceivedRelation")
         status friendShipRequestStatus @default(value: PENDING)
 }
 enum friendShipRequestStatus {
```


