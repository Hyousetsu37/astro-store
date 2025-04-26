import { db, Role, User } from "astro:db";
import bcrypt from "bcryptjs";
import { v4 as UUID } from "uuid";

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  const roles = [
    { id: "admin", name: "Administrator" },
    { id: "user", name: "System user" },
  ];

  const johnDoe = {
    id: UUID(),
    name: "John Doe",
    email: "john.doe@google.com",
    password: bcrypt.hashSync("123456"),
    role: "admin",
  };

  const janeDoe = {
    id: UUID(),
    name: "Jane Doe",
    email: "jane.doe@google.com",
    password: bcrypt.hashSync("123456"),
    role: "user",
  };
  await db.insert(User).values([johnDoe, janeDoe]);
  await db.insert(Role).values(roles);
}
