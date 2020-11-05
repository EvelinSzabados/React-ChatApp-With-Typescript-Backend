# Migration `20201105111510-init2-with-friend`

This migration has been generated at 11/5/2020, 12:15:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."users" ADD COLUMN "usersId" integer   

ALTER TABLE "public"."users" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201105111510-init2-with-friend
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,44 @@
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
+    id                Int        @id @default(autoincrement())
+    displayName       String
+    email             String     @unique
+    password          String
+    profilePictureUrl String
+    status            statuses   @default(value: OFFLINE)
+    chats             chats[]    @relation(name: "ChatUsers")
+    message           messages[]
+    friends           users[]    @relation("usersTousers")
+    users             users?     @relation("usersTousers", fields: [usersId], references: [id])
+    usersId           Int?
+}
+
+enum statuses {
+    OFFLINE
+    BUSY
+    AVAILABLE
+}
```


