CREATE SCHEMA IF NOT EXISTS "public";
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'STAFF');
CREATE TYPE "BookingStatus" AS ENUM ('HELD', 'CONFIRMED', 'CANCELLED', 'EXPIRED', 'CHECKED_IN', 'CHECKED_OUT', 'NO_SHOW');
CREATE TYPE "RuleType" AS ENUM ('BASE', 'WEEKDAY', 'DATE_RANGE', 'EXTRA_GUEST');
CREATE TYPE "ContentType" AS ENUM ('TEXT', 'RICH_TEXT', 'IMAGE', 'JSON');

CREATE TABLE "Property" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "address" TEXT, "phone" TEXT, "zalo" TEXT, "email" TEXT,
  "defaultHoldMinutes" INTEGER NOT NULL DEFAULT 120, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "AccommodationType" (
  "id" TEXT NOT NULL, "propertyId" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "shortName" TEXT NOT NULL,
  "description" TEXT NOT NULL, "longDescription" TEXT, "maxGuests" INTEGER NOT NULL, "baseGuests" INTEGER NOT NULL DEFAULT 2,
  "bedrooms" INTEGER NOT NULL DEFAULT 1, "beds" INTEGER NOT NULL DEFAULT 1, "bathrooms" INTEGER NOT NULL DEFAULT 1, "area" INTEGER,
  "basePrice" DECIMAL(12,0) NOT NULL, "heroImage" TEXT NOT NULL, "gallery" JSONB NOT NULL, "amenities" JSONB NOT NULL,
  "featured" BOOLEAN NOT NULL DEFAULT false, "active" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "AccommodationType_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Unit" (
  "id" TEXT NOT NULL, "accommodationTypeId" TEXT NOT NULL, "name" TEXT NOT NULL, "code" TEXT NOT NULL, "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "RateRule" (
  "id" TEXT NOT NULL, "accommodationTypeId" TEXT NOT NULL, "name" TEXT NOT NULL, "type" "RuleType" NOT NULL,
  "priority" INTEGER NOT NULL DEFAULT 0, "amount" DECIMAL(12,0) NOT NULL, "startDate" DATE, "endDate" DATE, "weekdays" INTEGER[],
  "minGuests" INTEGER, "active" BOOLEAN NOT NULL DEFAULT true, CONSTRAINT "RateRule_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Guest" (
  "id" TEXT NOT NULL, "fullName" TEXT NOT NULL, "phone" TEXT NOT NULL, "email" TEXT, "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Booking" (
  "id" TEXT NOT NULL, "code" TEXT NOT NULL, "unitId" TEXT NOT NULL, "guestId" TEXT NOT NULL, "status" "BookingStatus" NOT NULL DEFAULT 'HELD',
  "checkIn" DATE NOT NULL, "checkOut" DATE NOT NULL, "guests" INTEGER NOT NULL, "totalAmount" DECIMAL(12,0) NOT NULL, "priceSnapshot" JSONB NOT NULL,
  "guestNote" TEXT, "internalNote" TEXT, "holdExpiresAt" TIMESTAMP(3), "idempotencyKey" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "AvailabilityBlock" (
  "id" TEXT NOT NULL, "unitId" TEXT NOT NULL, "startDate" DATE NOT NULL, "endDate" DATE NOT NULL, "reason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AvailabilityBlock_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Payment" (
  "id" TEXT NOT NULL, "bookingId" TEXT NOT NULL, "amount" DECIMAL(12,0) NOT NULL, "method" TEXT NOT NULL, "reference" TEXT, "note" TEXT,
  "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" TEXT, CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "User" (
  "id" TEXT NOT NULL, "propertyId" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "passwordHash" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'STAFF', "active" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ContentBlock" (
  "id" TEXT NOT NULL, "propertyId" TEXT NOT NULL, "key" TEXT NOT NULL, "label" TEXT NOT NULL, "type" "ContentType" NOT NULL,
  "value" TEXT NOT NULL, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Setting" ("key" TEXT NOT NULL, "value" TEXT NOT NULL, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Setting_pkey" PRIMARY KEY ("key"));
CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL, "userId" TEXT, "action" TEXT NOT NULL, "entityType" TEXT NOT NULL, "entityId" TEXT, "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");
CREATE UNIQUE INDEX "AccommodationType_slug_key" ON "AccommodationType"("slug");
CREATE INDEX "AccommodationType_propertyId_active_idx" ON "AccommodationType"("propertyId", "active");
CREATE UNIQUE INDEX "Unit_code_key" ON "Unit"("code");
CREATE INDEX "Unit_accommodationTypeId_active_idx" ON "Unit"("accommodationTypeId", "active");
CREATE INDEX "RateRule_accommodationTypeId_active_priority_idx" ON "RateRule"("accommodationTypeId", "active", "priority");
CREATE INDEX "Guest_phone_idx" ON "Guest"("phone");
CREATE UNIQUE INDEX "Booking_code_key" ON "Booking"("code");
CREATE UNIQUE INDEX "Booking_idempotencyKey_key" ON "Booking"("idempotencyKey");
CREATE INDEX "Booking_unitId_checkIn_checkOut_status_idx" ON "Booking"("unitId", "checkIn", "checkOut", "status");
CREATE INDEX "Booking_status_holdExpiresAt_idx" ON "Booking"("status", "holdExpiresAt");
CREATE INDEX "AvailabilityBlock_unitId_startDate_endDate_idx" ON "AvailabilityBlock"("unitId", "startDate", "endDate");
CREATE INDEX "Payment_bookingId_paidAt_idx" ON "Payment"("bookingId", "paidAt");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "ContentBlock_key_key" ON "ContentBlock"("key");
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

ALTER TABLE "AccommodationType" ADD CONSTRAINT "AccommodationType_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_accommodationTypeId_fkey" FOREIGN KEY ("accommodationTypeId") REFERENCES "AccommodationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RateRule" ADD CONSTRAINT "RateRule_accommodationTypeId_fkey" FOREIGN KEY ("accommodationTypeId") REFERENCES "AccommodationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AvailabilityBlock" ADD CONSTRAINT "AvailabilityBlock_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "User" ADD CONSTRAINT "User_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_prevent_overlap" EXCLUDE USING gist (
  "unitId" WITH =, daterange("checkIn", "checkOut", '[)') WITH &&
) WHERE ("status" IN ('HELD', 'CONFIRMED', 'CHECKED_IN'));
