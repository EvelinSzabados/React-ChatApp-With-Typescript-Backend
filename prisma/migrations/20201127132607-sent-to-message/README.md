# Migration `20201127132607-sent-to-message`

This migration has been generated at 11/27/2020, 2:26:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."messages" ADD COLUMN "sent" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201127132607-sent-to-message
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,60 @@
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
+    id       Int      @id @default(autoincrement())
+    sender   users    @relation(fields: [senderId], references: [id])
+    senderId Int
+    text     String
+    chat     chats?   @relation(fields: [chatId], references: [id])
+    chatId   Int?
+    sent     DateTime @default(now())
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
+    friends                friendships[]    @relation("FriendShip")
+    friendRequestsSent     friendRequests[] @relation("RequestSender")
+    friendRequestsRecieved friendRequests[] @relation("RequestReciever")
+
+}
+
+model friendRequests {
+    id         Int   @id @default(autoincrement())
+    reciever   users @relation(name: "RequestReciever", fields: [recieverId], references: [id])
+    sender     users @relation(name: "RequestSender", fields: [senderId], references: [id])
+    senderId   Int
+    recieverId Int
+}
+
+model friendships {
+    id     Int     @id @default(autoincrement())
+    userId Int?
+    users  users[] @relation(name: "FriendShip", fields: [userId], references: [id])
+}
+
+enum statuses {
+    OFFLINE
+    BUSY
+    AVAILABLE
+}
```


