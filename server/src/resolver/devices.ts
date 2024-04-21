import { eq } from "drizzle-orm";
import { db } from "../db";
import { devices } from "../db/schema";

export const getDevices = async () => {
  return await db.select().from(devices);
};

export const getDeviceById = async ({ deviceId }: { deviceId: number }) => {
  return await db.query.devices.findFirst({
    where: eq(devices.id, deviceId),
  });
};
