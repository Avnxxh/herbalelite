import { pgTable, serial, text, varchar, boolean, jsonb,timestamp } from "drizzle-orm/pg-core";

export const herbalPlants = pgTable("herbal_plants", {
  id: serial("id").primaryKey(),
  itcHsCode: varchar("itc_hs_code", { length: 50 }).notNull(),
  commonName: varchar("common_name", { length: 255 }).notNull(),
  scientificName: varchar("scientific_name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  medicinalProperties: text("medicinal_properties").notNull(),
  usedParts: jsonb("used_parts").$type<string[]>().notNull(),
  preparationMethods: text("preparation_methods").notNull(),
  habitat: varchar("habitat", { length: 255 }).notNull(),
  imageUrls: jsonb("image_urls").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type HerbalPlant = typeof herbalPlants.$inferSelect;
export type NewHerbalPlant = typeof herbalPlants.$inferInsert;