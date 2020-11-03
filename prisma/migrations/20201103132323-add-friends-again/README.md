# Migration `20201103132323-add-friends-again`

This migration has been generated at 11/3/2020, 2:23:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."users" ADD COLUMN "friendId" integer   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201103122214-add-friends-to-users..20201103132323-add-friends-again
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
@@ -38,6 +38,8 @@
     status            statuses @relation(fields: [statusId], references: [id])
     chats     chats[]     @relation(name: "ChatUsers")
     message  messages[]
     statusId Int
-    friends users[]
+    
+    friendId Int?
+    friends   users[]   @relation("Friends")
 }
```


