import { auth } from "@/libs/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Force Next.js to read fresh cookies on every cycle
export const dynamic = "force-dynamic";

// 🟢 FIX: toNextJsHandler returns an object containing { GET, POST }. 
// Assign them clearly here so Next.js handles them as proper functions.
const authHandler = toNextJsHandler(auth);

export const GET = authHandler.GET;
export const POST = authHandler.POST;