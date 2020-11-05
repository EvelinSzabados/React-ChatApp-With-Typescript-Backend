# Migration `20201105102545`

This migration has been generated at 11/5/2020, 11:25:45 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."_FriendshipRelation" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_FriendshipRelation_AB_unique" ON "public"."_FriendshipRelation"("A", "B")

CREATE INDEX "_FriendshipRelation_B_index" ON "public"."_FriendshipRelation"("B")

ALTER TABLE "public"."_FriendshipRelation" ADD FOREIGN KEY("A")REFERENCES "public"."friendShips"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_FriendshipRelation" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105102424..20201105102545
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
@@ -31,16 +31,15 @@
     profilePictureUrl String
     status            statuses      @default(value: OFFLINE)
     chats             chats[]       @relation(name: "ChatUsers")
     message           messages[]
-    friendships       friendShips[]
+    friendships       friendShips[] @relation(name: "FriendshipRelation")
 }
 model friendShips {
-    id     Int     @id @default(autoincrement())
-    userId Int?
-    users  users[] @relation(fields: [userId], references: [id])
+    id    Int     @id @default(autoincrement())
+    users users[] @relation("FriendshipRelation")
 }
 enum friendShipRequestStatus {
     PENDING
```


