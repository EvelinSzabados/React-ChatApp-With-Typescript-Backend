# Migration `20201105102424`

This migration has been generated at 11/5/2020, 11:24:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."friendShips" ADD COLUMN "userId" integer   

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE'

CREATE TABLE "public"."_friendShipsTousers" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_friendShipsTousers_AB_unique" ON "public"."_friendShipsTousers"("A", "B")

CREATE INDEX "_friendShipsTousers_B_index" ON "public"."_friendShipsTousers"("B")

ALTER TABLE "public"."_friendShipsTousers" ADD FOREIGN KEY("A")REFERENCES "public"."friendShips"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_friendShipsTousers" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."friendShips" ADD FOREIGN KEY("userId")REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105102121-friendship10..20201105102424
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
@@ -31,22 +31,18 @@
     profilePictureUrl String
     status            statuses      @default(value: OFFLINE)
     chats             chats[]       @relation(name: "ChatUsers")
     message           messages[]
-    friendships       friendShips[] @relation(name: "Friendship")
+    friendships       friendShips[]
 }
 model friendShips {
-    id    Int     @id @default(autoincrement())
-    users users[] @relation(name: "Friendship")
+    id     Int     @id @default(autoincrement())
+    userId Int?
+    users  users[] @relation(fields: [userId], references: [id])
 }
-// model friendShipRequests {
-//     id     Int                     @id @default(autoincrement())
-//     status friendShipRequestStatus @default(value: PENDING)
-// }
-
 enum friendShipRequestStatus {
     PENDING
     ACCEPTED
     REJECTED
```


