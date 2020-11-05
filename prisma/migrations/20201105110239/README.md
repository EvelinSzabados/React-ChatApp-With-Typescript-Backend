# Migration `20201105110239`

This migration has been generated at 11/5/2020, 12:02:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."statuses" AS ENUM ('OFFLINE', 'BUSY', 'AVAILABLE')

ALTER TABLE "public"."users" DROP CONSTRAINT "users_statusId_fkey"

ALTER TABLE "public"."users" DROP COLUMN "statusId",
ADD COLUMN "status" "statuses"  NOT NULL DEFAULT E'OFFLINE',
ADD COLUMN "userAsFriendId" integer   

CREATE TABLE "public"."friend" (
"id" SERIAL,
"friendShipId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."friendShip" (
"id" SERIAL,
PRIMARY KEY ("id")
)

DROP TABLE "public"."friendShips"

DROP TABLE "public"."statuses"

ALTER TABLE "public"."friend" ADD FOREIGN KEY("friendShipId")REFERENCES "public"."friendShip"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY("userAsFriendId")REFERENCES "public"."friend"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105105248..20201105110239
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
@@ -31,12 +31,24 @@
     profilePictureUrl String
     status            statuses   @default(value: OFFLINE)
     chats             chats[]    @relation(name: "ChatUsers")
     message           messages[]
-    followedBy        users[]    @relation("UserFollows", references: [id])
-    following         users[]    @relation("UserFollows", references: [id])
+    userAsFriend      friend?    @relation(fields: [userAsFriendId], references: [id])
+    userAsFriendId    Int?
 }
+model friend {
+    id           Int         @id @default(autoincrement())
+    users        users[]
+    friendShip   friendShip? @relation(fields: [friendShipId], references: [id])
+    friendShipId Int?
+}
+
+model friendShip {
+    id      Int      @id @default(autoincrement())
+    friends friend[]
+}
+
 enum friendShipRequestStatus {
     PENDING
     ACCEPTED
     REJECTED
```


