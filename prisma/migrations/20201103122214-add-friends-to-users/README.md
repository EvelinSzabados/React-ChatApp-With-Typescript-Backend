# Migration `20201103122214-add-friends-to-users`

This migration has been generated at 11/3/2020, 1:22:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."users" ADD COLUMN "usersId" integer   

ALTER TABLE "public"."users" ADD FOREIGN KEY("usersId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201029141416-many-to-many..20201103122214-add-friends-to-users
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
@@ -10,9 +10,9 @@
 model chats {
     id          Int        @id @default(autoincrement())
     lastUpdated DateTime   @default(now())
     users       users[]    @relation(name : "ChatUsers")
-    messages    messages[]
+    messages    messages[] 
 }
 model messages {
     id       Int    @id @default(autoincrement())
@@ -35,11 +35,9 @@
     email             String   @unique
     password          String
     profilePictureUrl String
     status            statuses @relation(fields: [statusId], references: [id])
-
-
     chats     chats[]     @relation(name: "ChatUsers")
-
     message  messages[]
     statusId Int
+    friends users[]
 }
```


