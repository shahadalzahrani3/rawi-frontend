const KEY = "rawiDemoAccountsV2";

// Read saved demo accounts
export function readAccounts() {
  try {
    const data = JSON.parse(
      localStorage.getItem(KEY) || "[]"
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Save demo accounts
export function writeAccounts(accounts) {
  localStorage.setItem(KEY, JSON.stringify(accounts));
}

// Generate a password hash for demo verification
export async function digestPassword(password, salt) {
  const data = new TextEncoder().encode(
    `${salt}:${password}`
  );

  const bytes = new Uint8Array(
    await crypto.subtle.digest("SHA-256", data)
  );

  return Array.from(
    bytes,
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");
}

// Create demo Admin account
export async function createAdminAccount() {
  const accounts = readAccounts();

  const adminEmail = "admin@rawi.sa";

  const existingAdmin = accounts.find(
    (account) => account.email === adminEmail
  );

  if (existingAdmin) {
    return;
  }

  const salt = crypto.randomUUID();
  const hash = await digestPassword("Admin123", salt);

  const admin = {
    name: "نورة السالم",
    email: adminEmail,
    phone: "+966551234567",
    role: "admin",
    salt: salt,
    hash: hash,
    active: true,
    status: "normal",
    failedAttempts: 0,
    lockedUntil: 0
  };

  writeAccounts([...accounts, admin]);
}