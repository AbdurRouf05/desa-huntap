"use server";

import { PB_URL } from '@/lib/pocketbase';
import { cookies } from "next/headers";
import pb from "./pocketbase";

/**
 * Login admin (superuser) via PocketBase.
 * PocketBase v0.25+ uses _superusers collection.
 */
export async function loginAdmin(email: string, password: string) {
  try {
    const authData = await pb.collection("_superusers").authWithPassword(email, password);
    
    const cookieStore = await cookies();
    const authVal = JSON.stringify({ token: pb.authStore.token, record: pb.authStore.record });
    
    // Save auth token to cookie so middleware can read it
    cookieStore.set("cp_auth", authVal, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400 * 7 // 7 days
    });

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login gagal";
    return { success: false, error: message };
  }
}

/**
 * Logout admin — clear PocketBase auth store and remove cookie.
 */
export async function logoutAdmin() {
  pb.authStore.clear();
  const cookieStore = await cookies();
  cookieStore.delete("cp_auth");
}

/**
 * Helper to initialize PocketBase auth state from cookies in server components.
 * Returns a new safe instance per request to avoid session leaks.
 */
export async function getServerAuth() {
  const PocketBase = (await import("pocketbase")).default;
  const pbInstance = new PocketBase(PB_URL || "https://db-huntap.sagamuda.id");
  pbInstance.autoCancellation(false);

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("cp_auth")?.value;
  if (authCookie) {
    try {
      const parsed = JSON.parse(authCookie);
      pbInstance.authStore.save(parsed.token, parsed.record);
    } catch (e) {
      // invalid cookie
    }
  }
  return pbInstance;
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const pbInstance = await getServerAuth();
  return pbInstance.authStore.isValid;
}

/**
 * Login toko owner via PocketBase.
 * Uses the default 'users' collection.
 */
export async function loginToko(email: string, password: string) {
  try {
    const authData = await pb.collection("users").authWithPassword(email, password);
    
    const cookieStore = await cookies();
    const authVal = JSON.stringify({ token: pb.authStore.token, record: pb.authStore.record });
    
    // Save auth token to cookie so middleware can read it
    cookieStore.set("toko_auth", authVal, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400 * 7 // 7 days
    });

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login gagal";
    return { success: false, error: message };
  }
}

/**
 * Logout toko owner.
 */
export async function logoutToko() {
  pb.authStore.clear();
  const cookieStore = await cookies();
  cookieStore.delete("toko_auth");
}

/**
 * Helper to initialize PocketBase auth state from cookies in server components for Toko.
 */
export async function getServerTokoAuth() {
  const PocketBase = (await import("pocketbase")).default;
  const pbInstance = new PocketBase(PB_URL || "https://db-huntap.sagamuda.id");
  pbInstance.autoCancellation(false);

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("toko_auth")?.value;
  if (authCookie) {
    try {
      const parsed = JSON.parse(authCookie);
      pbInstance.authStore.save(parsed.token, parsed.record);
    } catch (e) {
      // invalid cookie
    }
  }
  return pbInstance;
}

export async function isTokoLoggedIn(): Promise<boolean> {
  const pbInstance = await getServerTokoAuth();
  return pbInstance.authStore.isValid;
}
