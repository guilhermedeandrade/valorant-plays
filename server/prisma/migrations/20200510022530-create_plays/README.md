# Migration `20200510022530-create_plays`

This migration has been generated by Guilherme de Andrade at 5/10/2020, 2:25:30 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Agent" AS ENUM ('Sova', 'Viper', 'Sage', 'Jett', 'Cypher', 'Brimstone', 'Breach', 'Phoenix', 'Omen', 'Raze');

CREATE TYPE "Map" AS ENUM ('Bind', 'Split', 'Haven');

CREATE TYPE "Usage" AS ENUM ('Offensive', 'Defensive', 'Retake');

CREATE TABLE "public"."Play" (
"agent" "Agent" NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"deletedAt" timestamp(3)  NOT NULL ,"description" text   ,"detailedImageUrl" text  NOT NULL ,"gifUrl" text  NOT NULL ,"id" text  NOT NULL ,"map" "Map" NOT NULL ,"submitterId" text  NOT NULL ,"title" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"usage" "Usage" NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."Play" ADD FOREIGN KEY ("submitterId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200510011502-create_users..20200510022530-create_plays
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
@@ -15,4 +15,45 @@
   createdAt DateTime @default(now())
   updatedAt DateTime @default(now())
   deletedAt DateTime @default(now())
 }
+
+model Play {
+  id               String  @id @default(uuid())
+  submitter        User    @relation(fields: [submitterId], references: [id])
+  submitterId      String
+  agent            Agent
+  map              Map
+  usage            Usage
+  title            String
+  description      String?
+  gifUrl           String
+  detailedImageUrl String
+  createdAt        DateTime @default(now())
+  updatedAt        DateTime @updatedAt
+  deletedAt        DateTime
+}
+
+enum Agent {
+  Sova
+  Viper
+  Sage
+  Jett
+  Cypher
+  Brimstone
+  Breach
+  Phoenix
+  Omen
+  Raze
+}
+
+enum Map {
+  Bind
+  Split
+  Haven
+}
+
+enum Usage {
+  Offensive
+  Defensive
+  Retake
+}
```

