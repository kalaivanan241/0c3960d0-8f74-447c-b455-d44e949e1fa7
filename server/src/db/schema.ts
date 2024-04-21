import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const devices = sqliteTable(
  "devices",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
    timezome: text("timezone"),
  },
  (devices) => ({
    nameIdx: uniqueIndex("nameIdx").on(devices.name),
  })
);

export const usersRelations = relations(devices, ({ many }) => ({
  savings: many(deviceSavings),
}));

export const deviceSavings = sqliteTable("devices-savings", {
  id: integer("id").primaryKey(),
  timestamp: text("timestamp")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  deviceTimestamp: text("device_timestamp")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  carbonSaved: integer("carbon_saved", { mode: "number" }).notNull(),
  fueldSaved: integer("fueld_saved", { mode: "number" }).notNull(),
  diviceId: integer("device_id")
    .references(() => devices.id)
    .notNull(),
});

export const deviceSavingsRelations = relations(deviceSavings, ({ one }) => ({
  device: one(devices, {
    fields: [deviceSavings.diviceId],
    references: [devices.id],
  }),
}));
