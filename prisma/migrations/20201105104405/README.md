# Migration `20201105104405`

This migration has been generated at 11/5/2020, 11:44:05 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE',
ADD COLUMN "friendShipId" integer   

CREATE TABLE "public"."friendShip" (
"id" SERIAL,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_friendShipTousers" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

DROP TABLE "public"."friendShips"

DROP TABLE "public"."statuses"

CREATE UNIQUE INDEX "_friendShipTousers_AB_unique" ON "public"."_friendShipTousers"("A", "B")

CREATE INDEX "_friendShipTousers_B_index" ON "public"."_friendShipTousers"("B")

ALTER TABLE "public"."_friendShipTousers" ADD FOREIGN KEY("A")REFERENCES "public"."friendShip"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_friendShipTousers" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY("friendShipId")REFERENCES "public"."friendShip"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105104237..20201105104405
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
@@ -23,17 +23,17 @@
     chatId   Int?
 }
 model users {
-    id                Int         @id @default(autoincrement())
+    id                Int          @id @default(autoincrement())
     displayName       String
-    email             String      @unique
+    email             String       @unique
     password          String
     profilePictureUrl String
-    status            statuses    @default(value: OFFLINE)
-    chats             chats[]     @relation(name: "ChatUsers")
+    status            statuses     @default(value: OFFLINE)
+    chats             chats[]      @relation(name: "ChatUsers")
     message           messages[]
-    friendShip        friendShip? @relation(fields: [friendShipId], references: [id])
+    friendShips       friendShip[] @relation(fields: [friendShipId], references: [id])
     friendShipId      Int?
 }
 model friendShip {
```


