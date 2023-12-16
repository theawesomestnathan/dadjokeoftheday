import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ 
  url: 'libsql://jokes-theawesomestnathan.turso.io', 
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEyLTE2VDA0OjQzOjQwLjkzMzgwMTAzNloiLCJpZCI6ImRmMGZkNGU4LTliMzktMTFlZS05NGZmLTUyNTM4OTRjOTA2OCJ9.kmujUNWMypR2O0BEl2k74ORcBzMoHyG71rV6q3gahjw9sIJhpCYoj4L7JvDbMJ3vR5g65KP4L7sl7n1B_R3UCA' 
});

export const db = drizzle(client);