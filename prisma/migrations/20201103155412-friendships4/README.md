# Migration `20201103155412-friendships4`

This migration has been generated at 11/3/2020, 4:54:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."friendShipRequest" (
"id" SERIAL,
"senderId" integer   NOT NULL ,
"recieverId" integer   NOT NULL ,
"status" "friendShipRequestStatus"  NOT NULL DEFAULT E'PENDING',
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_Friendship" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_Friendship_AB_unique" ON "public"."_Friendship"("A", "B")

CREATE INDEX "_Friendship_B_index" ON "public"."_Friendship"("B")

ALTER TABLE "public"."friendShipRequest" ADD FOREIGN KEY("senderId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."friendShipRequest" ADD FOREIGN KEY("recieverId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("A")REFERENCES "public"."friendShips"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201103152641-frinedships3..20201103155412-friendships4
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
@@ -32,11 +32,10 @@
     status            statuses @default(value: OFFLINE)
     chats     chats[]     @relation(name: "ChatUsers")
     message  messages[]
     friendships friendShips[] @relation(name: "Friendship")
-    friendshipRequestsSent friendShipRequest[] @relation(name: "FriendshipRequestsSentRelation")
-    friendshipRequestsReceived friendShipRequest[] @relation(name: "FriendshipRequestsReceivedRelation")
-   
+    requestsSent friendShipRequest[] @relation(name: "FriendshipRequestsSentRelation")
+    requestsRecieved friendShipRequest[]  @relation(name: "FriendshipRequestsReceivedRelation")
 }
 model friendShips{
     id Int @id @default(autoincrement())
```


