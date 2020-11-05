# Migration `20201105110335`

This migration has been generated at 11/5/2020, 12:03:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

DROP TABLE "public"."friendShips"

DROP TABLE "public"."statuses"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105110316..20201105110335
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
@@ -31,18 +31,10 @@
     profilePictureUrl String
     status            statuses   @default(value: OFFLINE)
     chats             chats[]    @relation(name: "ChatUsers")
     message           messages[]
-    userAsFriend      friend?    @relation(fields: [userAsFriendId], references: [id])
-    userAsFriendId    Int?
 }
-model friend {
-    id    Int     @id @default(autoincrement())
-    users users[]
-
-}
-
 enum friendShipRequestStatus {
     PENDING
     ACCEPTED
     REJECTED
```


