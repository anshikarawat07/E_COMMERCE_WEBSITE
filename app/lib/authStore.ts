import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

type StoredUser = {
  id: number;
  name: string;
  email: string;
  password: string; // hashed
  createdAt: string;
};

const USERS_FILE = path.join(process.cwd(), ".data", "users.json");

async function readUsers(): Promise<StoredUser[]> {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredUser[];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function signupFallback({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const users = await readUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return { ok: false as const, error: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user: StoredUser = {
    id: nextId,
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  return { ok: true as const, user };
}

export async function loginFallback({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const users = await readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false as const, error: "User not found" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { ok: false as const, error: "Wrong password" };

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "urbanthreadsecret",
    { expiresIn: "1d" }
  );

  return {
    ok: true as const,
    token,
    name: user.name,
  };
}

