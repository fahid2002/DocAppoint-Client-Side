import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Ensure the URI exists to prevent runtime crashes
if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const client = new MongoClient(process.env.MONGODB_URI, {
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

// 🟢 Safely extract and expose the database instance mapping explicitly
const db = client.db("DocAppoint-JS");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
  account: {
    accountLinking: {
      // 🟢 CHANGE TO FALSE: Blocks Google sign-ups from auto-logging into existing email/password accounts
      enabled: false, 
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,     // 1 day
  },
  
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});