# Migration `20201103145341-friendships`

This migration has been generated at 11/3/2020, 3:53:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."friendShipRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_usersId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "usersId",
DROP COLUMN "friendId"

CREATE TABLE "public"."friendShips" (
"id" SERIAL,
PRIMARY KEY ("id")
)

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
migration 20201103132323-add-friends-again..20201103145341-friendships
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
@@ -38,8 +38,27 @@
     status            statuses @relation(fields: [statusId], references: [id])
     chats     chats[]     @relation(name: "ChatUsers")
     message  messages[]
     statusId Int
-    
-    friendId Int?
-    friends   users[]   @relation("Friends")
+    friendships friendShips[]
+    friendshipRequestsSent friendShipRequest[] @relation(name: "FriendshipRequestsSentRelation")
+    friendshipRequestsReceived friendShipRequest[] @relation(name: "FriendshipRequestsReceivedRelation")
+   
 }
+
+model friendShips{
+    id Int @id @default(autoincrement())
+    users users[]
+}
+
+model friendShipRequest {
+        id Int @id @default(autoincrement())
+        from users @relation(name: "FriendshipRequestsSentRelation")
+        to users @relation(name: "FriendshipRequestsReceivedRelation")
+        status friendShipRequestStatus @default(value: PENDING)
+}
+
+enum friendShipRequestStatus {
+        PENDING
+        ACCEPTED
+        REJECTED
+}
```


