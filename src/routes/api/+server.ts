import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { db } from "$lib/db";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function GET() {
  let file = readFileSync(resolve(__dirname, "./jokes.txt"), "utf-8");

  const jokes = file.split("\n");

  const today = new Date();

  const jokecords = sqliteTable("jokecords", {
    joke: text("joke"),
    month: text("month"),
    day: text("day")
  });

  const matches = await db.select().from(jokecords).where(
    sql`month = ${today.getMonth().toString()} and day = ${today.getDay().toString()}`
  );

  let joke;

  if (matches.length > 0) {
    joke = matches[0];
  }
  else {
    joke = jokes[Math.floor(Math.random() * jokes.length)];
    await db.insert(jokecords).values({
      joke: joke,
      month: today.getMonth().toString(),
      day: today.getDay().toString()
    });
  }

  return new Response(JSON.stringify({ joke: joke }), {
    headers: { 'Content-Type': 'application/json' },
  });
}