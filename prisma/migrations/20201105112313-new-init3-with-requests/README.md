# Migration `20201105112313-new-init3-with-requests`

This migration has been generated at 11/5/2020, 12:23:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."requestStatuses" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED')

CREATE TABLE "public"."friendRequests" (
"id" SERIAL,
"senderId" integer   NOT NULL ,
"recieverId" integer   NOT NULL ,
"status" "requestStatuses"  NOT NULL DEFAULT E'PENDING',
PRIMARY KEY ("id")
)

ALTER TABLE "public"."friendRequests" ADD FOREIGN KEY("recieverId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."friendRequests" ADD FOREIGN KEY("senderId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201105112313-new-init3-with-requests
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,61 @@
+datasource db {
+    provider = "postgresql"
+    url = "***"
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
+
+model chats {
+    id          Int        @id @default(autoincrement())
+    lastUpdated DateTime   @default(now())
+    users       users[]    @relation(name: "ChatUsers")
+    messages    messages[]
+}
+
+model messages {
+    id       Int    @id @default(autoincrement())
+    sender   users  @relation(fields: [senderId], references: [id])
+    senderId Int
+    text     String
+    chat     chats? @relation(fields: [chatId], references: [id])
+    chatId   Int?
+}
+
+model users {
+    id                     Int              @id @default(autoincrement())
+    displayName            String
+    email                  String           @unique
+    password               String
+    profilePictureUrl      String
+    status                 statuses         @default(value: OFFLINE)
+    chats                  chats[]          @relation(name: "ChatUsers")
+    message                messages[]
+    friends                users[]          @relation("usersTousers")
+    users                  users?           @relation("usersTousers", fields: [usersId], references: [id])
+    usersId                Int?
+    friendRequestsSent     friendRequests[] @relation("RequestSender")
+    friendRequestsRecieved friendRequests[] @relation("RequestReciever")
+}
+
+model friendRequests {
+    id         Int             @id @default(autoincrement())
+    reciever   users           @relation(name: "RequestReciever", fields: [recieverId], references: [id])
+    sender     users           @relation(name: "RequestSender", fields: [senderId], references: [id])
+    senderId   Int
+    recieverId Int
+    status     requestStatuses @default(value: PENDING)
+}
+
+enum requestStatuses {
+    PENDING
+    ACCEPTED
+    DECLINED
+}
+
+enum statuses {
+    OFFLINE
+    BUSY
+    AVAILABLE
+}
```


