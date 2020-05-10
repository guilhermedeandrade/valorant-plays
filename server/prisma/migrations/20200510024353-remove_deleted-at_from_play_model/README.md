# Migration `20200510024353-remove_deleted-at_from_play_model`

This migration has been generated by Guilherme de Andrade at 5/10/2020, 2:43:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Play" DROP COLUMN "deletedAt";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200510022530-create_plays..20200510024353-remove_deleted-at_from_play_model
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -29,9 +29,8 @@
   gifUrl           String
   detailedImageUrl String
   createdAt        DateTime @default(now())
   updatedAt        DateTime @updatedAt
-  deletedAt        DateTime
 }
 enum Agent {
   Sova
```

