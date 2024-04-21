import { SQL, and, avg, between, eq, max, min, sql, sum } from "drizzle-orm";
import { db } from "../db";
import { deviceSavings, devices } from "../db/schema";
import { dateDifferenceInMonths } from "../utils/common";

export async function getStatistics({ deviceId }: { deviceId: number }) {
  const whereStatements: SQL<unknown>[] = [];

  const querry = db
    .select({
      carbonSaved: sum(deviceSavings.carbonSaved),
      fuelSaved: sum(deviceSavings.fueldSaved),
      minDate: min(deviceSavings.timestamp),
      maxDate: max(deviceSavings.timestamp),
    })
    .from(deviceSavings);

  if (deviceId) {
    const device = await db.query.devices.findFirst({
      where: eq(devices.id, deviceId),
    });
    if (!device) throw Error(`Device with id = ${deviceId}, not found.`);
    querry
      .where(eq(deviceSavings.diviceId, deviceId))
      .groupBy(deviceSavings.diviceId);
  }

  const groupedData = await querry;

  const data = groupedData.length ? groupedData[0] : null;
  if (!data) return {};
  const { carbonSaved, fuelSaved } = data;
  return {
    total: { carbonSaved, fuelSaved },
    monthlyAverage: () => {
      const { minDate, maxDate } = data;
      const from = minDate ? new Date(minDate) : new Date();
      const to = maxDate ? new Date(maxDate) : new Date();
      const months = dateDifferenceInMonths(from, to) || 1;

      return {
        carbonSaved: () => Number(carbonSaved) / months,
        fuelSaved: () => Number(fuelSaved) / months,
      };
    },
  };
}

export async function getData({
  deviceId,
  from,
  to,
}: {
  deviceId?: number;
  from: string;
  to: string;
}) {
  const whereStatements: SQL<unknown>[] = [
    between(deviceSavings.timestamp, from, to),
  ];

  if (deviceId) {
    const device = await db.query.devices
      .findFirst({
        where: eq(devices.id, deviceId),
      })
      .catch((e) => {
        console.error(e);
        throw Error("Something went wrong");
      });
    if (!device) throw Error(`Device with id = ${deviceId}, not found.`);
    whereStatements.push(eq(deviceSavings.diviceId, deviceId));
  }
  try {
    const query = await db
      .select({
        carbonSaved: sum(deviceSavings.carbonSaved),
        fuelSaved: sum(deviceSavings.fueldSaved),
        date: sql`substr(timestamp, 1, 10)`.as("date"),
      })
      .from(deviceSavings)
      .where(and(...whereStatements))
      .groupBy(sql`date`);

    return {
      statistics: () => {
        const carbonSaved = query.reduce(
          (sum, d) => sum + Number(d.carbonSaved ?? 0),
          0
        );
        const fuelSaved = query.reduce(
          (sum, d) => sum + Number(d.fuelSaved ?? 0),
          0
        );
        return {
          total: { carbonSaved, fuelSaved },
          monthlyAverage: () => {
            const months =
              dateDifferenceInMonths(new Date(from), new Date(to)) || 1;
            return {
              carbonSaved: () => carbonSaved / months,
              fuelSaved: () => fuelSaved / months,
            };
          },
        };
      },
      data: query,
    };
  } catch (err) {
    console.error(err);
    throw Error("Something went wrong");
  }
}
