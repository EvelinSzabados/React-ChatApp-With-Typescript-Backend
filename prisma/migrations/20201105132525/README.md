# Migration `20201105132525`

This migration has been generated at 11/5/2020, 2:25:25 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."_usersTousers" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

CREATE UNIQUE INDEX "_usersTousers_AB_unique" ON "public"."_usersTousers"("A", "B")

CREATE INDEX "_usersTousers_B_index" ON "public"."_usersTousers"("B")

ALTER TABLE "public"."_usersTousers" ADD FOREIGN KEY("A")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_usersTousers" ADD FOREIGN KEY("B")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105123754-delete-status-from-rquests..20201105132525
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
@@ -32,9 +32,9 @@
     status                 statuses         @default(value: OFFLINE)
     chats                  chats[]          @relation(name: "ChatUsers")
     message                messages[]
     friends                users[]          @relation("usersTousers")
-    users                  users?           @relation("usersTousers", fields: [usersId], references: [id])
+    users                  users[]          @relation("usersTousers", fields: [usersId], references: [id])
     usersId                Int?
     friendRequestsSent     friendRequests[] @relation("RequestSender")
     friendRequestsRecieved friendRequests[] @relation("RequestReciever")
 }
```


