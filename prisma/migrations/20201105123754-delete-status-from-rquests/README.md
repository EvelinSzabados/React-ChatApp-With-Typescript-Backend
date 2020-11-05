# Migration `20201105123754-delete-status-from-rquests`

This migration has been generated at 11/5/2020, 1:37:54 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."friendRequests" DROP COLUMN "status"

DROP TYPE "requestStatuses"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105112313-new-init3-with-requests..20201105123754-delete-status-from-rquests
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
@@ -39,20 +39,14 @@
     friendRequestsRecieved friendRequests[] @relation("RequestReciever")
 }
 model friendRequests {
-    id         Int             @id @default(autoincrement())
-    reciever   users           @relation(name: "RequestReciever", fields: [recieverId], references: [id])
-    sender     users           @relation(name: "RequestSender", fields: [senderId], references: [id])
+    id         Int   @id @default(autoincrement())
+    reciever   users @relation(name: "RequestReciever", fields: [recieverId], references: [id])
+    sender     users @relation(name: "RequestSender", fields: [senderId], references: [id])
     senderId   Int
     recieverId Int
-    status     requestStatuses @default(value: PENDING)
-}
-enum requestStatuses {
-    PENDING
-    ACCEPTED
-    DECLINED
 }
 enum statuses {
     OFFLINE
```


