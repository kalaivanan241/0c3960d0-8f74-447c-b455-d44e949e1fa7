import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { db } from ".";
import { deviceSavings, devices } from "./schema";

const DATA_DIR = path.join(__dirname, "../../data");

const writeDevicesDB = async () => {
  await fs
    .createReadStream(path.join(DATA_DIR, "devices.csv"))
    .pipe(csv())
    .on("data", async (data) => {
      await db.insert(devices).values({
        name: data["name"],
        timezome: data["timezone"],
      });
    });
};

const writeDeviceSavingsToDB = async () => {
  await fs
    .createReadStream(path.join(DATA_DIR, "device-saving.csv"))
    .pipe(csv())
    .on("data", async (data) => {
      await db.insert(deviceSavings).values({
        diviceId: data["device_id"],
        timestamp: data["timestamp"],
        deviceTimestamp: data["device_timestamp"],
        carbonSaved: data["carbon_saved"],
        fueldSaved: data["fueld_saved"],
      });
    });
};

const execute = async () => {
  await writeDevicesDB();
  await writeDeviceSavingsToDB();
};

execute();
