# Migration `20201029095343-new-table-names`

This migration has been generated at 10/29/2020, 10:53:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."message" DROP CONSTRAINT "message_chatId_fkey"

ALTER TABLE "public"."message" DROP CONSTRAINT "message_senderId_fkey"

ALTER TABLE "public"."user" DROP CONSTRAINT "user_chatId_fkey"

ALTER TABLE "public"."user" DROP CONSTRAINT "user_statusId_fkey"

CREATE TABLE "public"."chats" (
"id" SERIAL,
"lastUpdated" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."messages" (
"id" SERIAL,
"senderId" integer   NOT NULL ,
"text" text   NOT NULL ,
"chatId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."statuses" (
"id" SERIAL,
"statusName" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."users" (
"id" SERIAL,
"displayName" text   NOT NULL ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
"profilePictureUrl" text   NOT NULL ,
"chatId" integer   ,
"statusId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

DROP TABLE "public"."chat"

DROP TABLE "public"."message"

DROP TABLE "public"."status"

DROP TABLE "public"."user"

CREATE UNIQUE INDEX "users.email_unique" ON "public"."users"("email")

ALTER TABLE "public"."messages" ADD FOREIGN KEY("senderId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."messages" ADD FOREIGN KEY("chatId")REFERENCES "public"."chats"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY("statusId")REFERENCES "public"."statuses"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY("chatId")REFERENCES "public"."chats"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201028140012-init..20201029095343-new-table-names
--- datamodel.dml
+++ datamodel.dml
@@ -1,45 +1,45 @@
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
 }
-model chat {
-    id          Int       @id @default(autoincrement())
-    lastUpdated DateTime  @default(now())
-    users       user[]
-    messages    message[]
+model chats {
+    id          Int        @id @default(autoincrement())
+    lastUpdated DateTime   @default(now())
+    users       users[]
+    messages    messages[]
 }
-model message {
+model messages {
     id       Int    @id @default(autoincrement())
-    sender   user   @relation(fields: [senderId], references: [id])
+    sender   users  @relation(fields: [senderId], references: [id])
     senderId Int
     text     String
-    chat     chat?  @relation(fields: [chatId], references: [id])
+    chat     chats? @relation(fields: [chatId], references: [id])
     chatId   Int?
 }
-model status {
-    id         Int    @id @default(autoincrement())
+model statuses {
+    id         Int     @id @default(autoincrement())
     statusName String
-    user       user[]
+    user       users[]
 }
-model user {
-    id                Int    @id @default(autoincrement())
+model users {
+    id                Int      @id @default(autoincrement())
     displayName       String
-    email             String @unique
+    email             String   @unique
     password          String
     profilePictureUrl String
-    status            status @relation(fields: [statusId], references: [id])
+    status            statuses @relation(fields: [statusId], references: [id])
-    chat     chat?     @relation(fields: [chatId], references: [id])
+    chat     chats?     @relation(fields: [chatId], references: [id])
     chatId   Int?
-    message  message[]
+    message  messages[]
     statusId Int
 }
```


