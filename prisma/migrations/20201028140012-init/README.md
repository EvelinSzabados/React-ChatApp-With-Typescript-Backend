# Migration `20201028140012-init`

This migration has been generated at 10/28/2020, 3:00:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."message" ADD COLUMN "text" text   NOT NULL 

ALTER TABLE "public"."user" DROP COLUMN "status",
ADD COLUMN "statusId" integer   NOT NULL 

CREATE TABLE "public"."status" (
"id" SERIAL,
"statusName" text   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."user" ADD FOREIGN KEY("statusId")REFERENCES "public"."status"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201028140012-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+datasource db {
+    provider = "postgresql"
+    url = "***"
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
+
+model chat {
+    id          Int       @id @default(autoincrement())
+    lastUpdated DateTime  @default(now())
+    users       user[]
+    messages    message[]
+}
+
+model message {
+    id       Int    @id @default(autoincrement())
+    sender   user   @relation(fields: [senderId], references: [id])
+    senderId Int
+    text     String
+    chat     chat?  @relation(fields: [chatId], references: [id])
+    chatId   Int?
+}
+
+model status {
+    id         Int    @id @default(autoincrement())
+    statusName String
+    user       user[]
+}
+
+model user {
+    id                Int    @id @default(autoincrement())
+    displayName       String
+    email             String @unique
+    password          String
+    profilePictureUrl String
+    status            status @relation(fields: [statusId], references: [id])
+
+
+    chat     chat?     @relation(fields: [chatId], references: [id])
+    chatId   Int?
+    message  message[]
+    statusId Int
+}
```


