# Migration `20201029141416-many-to-many`

This migration has been generated at 10/29/2020, 3:14:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."users" DROP CONSTRAINT "users_chatId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "chatId"

CREATE TABLE "public"."_ChatUsers" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

CREATE UNIQUE INDEX "_ChatUsers_AB_unique" ON "public"."_ChatUsers"("A", "B")

CREATE INDEX "_ChatUsers_B_index" ON "public"."_ChatUsers"("B")

ALTER TABLE "public"."_ChatUsers" ADD FOREIGN KEY("A")REFERENCES "public"."chats"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_ChatUsers" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201029095343-new-table-names..20201029141416-many-to-many
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
@@ -9,9 +9,9 @@
 model chats {
     id          Int        @id @default(autoincrement())
     lastUpdated DateTime   @default(now())
-    users       users[]
+    users       users[]    @relation(name : "ChatUsers")
     messages    messages[]
 }
 model messages {
@@ -37,9 +37,9 @@
     profilePictureUrl String
     status            statuses @relation(fields: [statusId], references: [id])
-    chat     chats?     @relation(fields: [chatId], references: [id])
-    chatId   Int?
+    chats     chats[]     @relation(name: "ChatUsers")
+
     message  messages[]
     statusId Int
 }
```


