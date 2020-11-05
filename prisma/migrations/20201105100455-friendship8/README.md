# Migration `20201105100455-friendship8`

This migration has been generated at 11/5/2020, 11:04:55 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."friendShipRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED')

CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."friendShips" (
"id" SERIAL,
PRIMARY KEY ("id")
)

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
migration 20201103162608-friendships7..20201105100455-friendship8
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
@@ -9,10 +9,10 @@
 model chats {
     id          Int        @id @default(autoincrement())
     lastUpdated DateTime   @default(now())
-    users       users[]    @relation(name : "ChatUsers")
-    messages    messages[] 
+    users       users[]    @relation(name: "ChatUsers")
+    messages    messages[]
 }
 model messages {
     id       Int    @id @default(autoincrement())
@@ -23,44 +23,50 @@
     chatId   Int?
 }
 model users {
-    id                Int      @id @default(autoincrement())
-    displayName       String
-    email             String   @unique
-    password          String
-    profilePictureUrl String
-    status            statuses @default(value: OFFLINE)
-    chats     chats[]     @relation(name: "ChatUsers")
-    message  messages[]
-    friendships friendShips[] @relation(name: "Friendship")
-    requestsSent friendShipRequestSent[]
-    requestsRecieved friendShipRequestRecieved[]  
+    id                        Int                         @id @default(autoincrement())
+    displayName               String
+    email                     String                      @unique
+    password                  String
+    profilePictureUrl         String
+    status                    statuses                    @default(value: OFFLINE)
+    chats                     chats[]                     @relation(name: "ChatUsers")
+    message                   messages[]
+    friendships               friendShips[]               @relation(name: "Friendship")
+    requestsSent              friendShipRequestSent[]
+    requestsRecieved          friendShipRequestRecieved[]
+    friendShipRequestSent     friendShipRequestSent[]     @relation("FriendshipRequestsSentRelation")
+    friendShipRequestRecieved friendShipRequestRecieved[] @relation("FriendshipRequestsReceivedRelation")
 }
-model friendShips{
-    id Int @id @default(autoincrement())
+model friendShips {
+    id    Int     @id @default(autoincrement())
     users users[] @relation(name: "Friendship")
 }
 model friendShipRequestSent {
-        id Int @id @default(autoincrement())
-        senderId Int
-        sender users @relation(name: "FriendshipRequestsSentRelation", fields:[senderId], references: [id])
-        status friendShipRequestStatus @default(value: PENDING)
+    id       Int                     @id @default(autoincrement())
+    senderId Int
+    sender   users                   @relation(name: "FriendshipRequestsSentRelation", fields: [senderId], references: [id])
+    status   friendShipRequestStatus @default(value: PENDING)
+    users    users?                  @relation(fields: [usersId], references: [id])
+    usersId  Int?
 }
-model friendShipRequestRecieved{
-        id Int @id @default(autoincrement())
-        recieverId Int
-        reciever users @relation(name: "FriendshipRequestsReceivedRelation", fields:[recieverId], references: [id])
-        status friendShipRequestStatus @default(value: PENDING)
+model friendShipRequestRecieved {
+    id         Int                     @id @default(autoincrement())
+    recieverId Int
+    reciever   users                   @relation(name: "FriendshipRequestsReceivedRelation", fields: [recieverId], references: [id])
+    status     friendShipRequestStatus @default(value: PENDING)
+    users      users?                  @relation(fields: [usersId], references: [id])
+    usersId    Int?
 }
 enum friendShipRequestStatus {
-        PENDING
-        ACCEPTED
-        REJECTED
+    PENDING
+    ACCEPTED
+    REJECTED
 }
 enum statuses {
     OFFLINE
```


