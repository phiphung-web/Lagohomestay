CREATE TABLE "Zone" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "AccommodationType" ADD COLUMN "zoneId" TEXT;

CREATE UNIQUE INDEX "Zone_slug_key" ON "Zone"("slug");
CREATE INDEX "Zone_propertyId_active_sortOrder_idx" ON "Zone"("propertyId", "active", "sortOrder");
CREATE INDEX "AccommodationType_zoneId_active_idx" ON "AccommodationType"("zoneId", "active");

ALTER TABLE "Zone"
ADD CONSTRAINT "Zone_propertyId_fkey"
FOREIGN KEY ("propertyId") REFERENCES "Property"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AccommodationType"
ADD CONSTRAINT "AccommodationType_zoneId_fkey"
FOREIGN KEY ("zoneId") REFERENCES "Zone"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
