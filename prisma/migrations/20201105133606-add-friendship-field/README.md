# Migration `20201105133606-add-friendship-field`

This migration has been generated at 11/5/2020, 2:36:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."_usersTousers" DROP CONSTRAINT "_usersTousers_A_fkey"

ALTER TABLE "public"."_usersTousers" DROP CONSTRAINT "_usersTousers_B_fkey"

ALTER TABLE "public"."users" DROP CONSTRAINT "users_usersId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "usersId"

CREATE TABLE "public"."friendships" (
"id" SERIAL,
"userId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_FriendShip" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."_usersTousers"

CREATE UNIQUE INDEX "_FriendShip_AB_unique" ON "public"."_FriendShip"("A", "B")

CREATE INDEX "_FriendShip_B_index" ON "public"."_FriendShip"("B")

ALTER TABLE "public"."friendships" ADD FOREIGN KEY("userId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."_FriendShip" ADD FOREIGN KEY("A")REFERENCES "public"."friendships"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_FriendShip" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105132525..20201105133606-add-friendship-field
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
@@ -31,11 +31,9 @@
     profilePictureUrl      String
     status                 statuses         @default(value: OFFLINE)
     chats                  chats[]          @relation(name: "ChatUsers")
     message                messages[]
-    friends                users[]          @relation("usersTousers")
-    users                  users[]          @relation("usersTousers", fields: [usersId], references: [id])
-    usersId                Int?
+    friends                friendships[]    @relation("FriendShip")
     friendRequestsSent     friendRequests[] @relation("RequestSender")
     friendRequestsRecieved friendRequests[] @relation("RequestReciever")
 }
@@ -44,9 +42,14 @@
     reciever   users @relation(name: "RequestReciever", fields: [recieverId], references: [id])
     sender     users @relation(name: "RequestSender", fields: [senderId], references: [id])
     senderId   Int
     recieverId Int
+}
+model friendships {
+    id     Int     @id @default(autoincrement())
+    userId Int?
+    users  users[] @relation(name: "FriendShip", fields: [userId], references: [id])
 }
 enum statuses {
     OFFLINE
```


