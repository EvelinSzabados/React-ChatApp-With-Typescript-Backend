# Migration `20201103162608-friendships7`

This migration has been generated at 11/3/2020, 5:26:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."friendShipRequestSent" (
"id" SERIAL,
"senderId" integer   NOT NULL ,
"status" "friendShipRequestStatus"  NOT NULL DEFAULT E'PENDING',
"usersId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."friendShipRequestRecieved" (
"id" SERIAL,
"recieverId" integer   NOT NULL ,
"status" "friendShipRequestStatus"  NOT NULL DEFAULT E'PENDING',
"usersId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_Friendship" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_Friendship_AB_unique" ON "public"."_Friendship"("A", "B")

CREATE INDEX "_Friendship_B_index" ON "public"."_Friendship"("B")

ALTER TABLE "public"."friendShipRequestSent" ADD FOREIGN KEY("senderId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."friendShipRequestSent" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."friendShipRequestRecieved" ADD FOREIGN KEY("recieverId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."friendShipRequestRecieved" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("A")REFERENCES "public"."friendShips"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201103162413-friendships6..20201103162608-friendships7
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
@@ -32,10 +32,10 @@
     status            statuses @default(value: OFFLINE)
     chats     chats[]     @relation(name: "ChatUsers")
     message  messages[]
     friendships friendShips[] @relation(name: "Friendship")
-    requestsSent friendShipRequestSent[] @relation(name: "FriendshipRequestsSentRelation")
-    requestsRecieved friendShipRequestRecieved[]  @relation(name: "FriendshipRequestsReceivedRelation")
+    requestsSent friendShipRequestSent[]
+    requestsRecieved friendShipRequestRecieved[]  
 }
 model friendShips{
     id Int @id @default(autoincrement())
@@ -43,15 +43,17 @@
 }
 model friendShipRequestSent {
         id Int @id @default(autoincrement())
-        sender users @relation(name: "FriendshipRequestsSentRelation")
+        senderId Int
+        sender users @relation(name: "FriendshipRequestsSentRelation", fields:[senderId], references: [id])
         status friendShipRequestStatus @default(value: PENDING)
 }
 model friendShipRequestRecieved{
         id Int @id @default(autoincrement())
-        reciever users @relation(name: "FriendshipRequestsReceivedRelation")
+        recieverId Int
+        reciever users @relation(name: "FriendshipRequestsReceivedRelation", fields:[recieverId], references: [id])
         status friendShipRequestStatus @default(value: PENDING)
 }
 enum friendShipRequestStatus {
```


