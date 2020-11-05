# Migration `20201105102121-friendship10`

This migration has been generated at 11/5/2020, 11:21:21 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."_Friendship" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_Friendship_AB_unique" ON "public"."_Friendship"("A", "B")

CREATE INDEX "_Friendship_B_index" ON "public"."_Friendship"("B")

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("A")REFERENCES "public"."friendShips"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_Friendship" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105100830-friendship9..20201105102121-friendship10
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
@@ -23,36 +23,30 @@
     chatId   Int?
 }
 model users {
-    id                        Int                  @id @default(autoincrement())
-    displayName               String
-    email                     String               @unique
-    password                  String
-    profilePictureUrl         String
-    status                    statuses             @default(value: OFFLINE)
-    chats                     chats[]              @relation(name: "ChatUsers")
-    message                   messages[]
-    friendships               friendShips[]        @relation(name: "Friendship")
-    friendShipRequestSent     friendShipRequests[] @relation("FriendshipRequestsSentRelation")
-    friendShipRequestRecieved friendShipRequests[] @relation("FriendshipRequestsReceivedRelation")
+    id                Int           @id @default(autoincrement())
+    displayName       String
+    email             String        @unique
+    password          String
+    profilePictureUrl String
+    status            statuses      @default(value: OFFLINE)
+    chats             chats[]       @relation(name: "ChatUsers")
+    message           messages[]
+    friendships       friendShips[] @relation(name: "Friendship")
+
 }
 model friendShips {
     id    Int     @id @default(autoincrement())
     users users[] @relation(name: "Friendship")
 }
-model friendShipRequests {
-    id         Int                     @id @default(autoincrement())
-    senderId   Int
-    sender     users                   @relation(name: "FriendshipRequestsSentRelation", fields: [senderId], references: [id])
-    status     friendShipRequestStatus @default(value: PENDING)
-    recieverId Int
-    reciever   users                   @relation(name: "FriendshipRequestsReceivedRelation", fields: [recieverId], references: [id])
+// model friendShipRequests {
+//     id     Int                     @id @default(autoincrement())
+//     status friendShipRequestStatus @default(value: PENDING)
+// }
-}
-
 enum friendShipRequestStatus {
     PENDING
     ACCEPTED
     REJECTED
```


