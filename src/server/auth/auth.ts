import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/server/database/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.SESSION_SECRET ?? "lago-development-session-secret-change-me",
  trustHost: true,
  pages: { signIn: "/admin/dang-nhap" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        const result = credentialsSchema.safeParse(raw);
        if (!result.success) return null;
        const { email, password } = result.data;
        if (process.env.DEMO_MODE !== "false" && email === "owner@lago.local" && password === "Lago@2026") {
          return { id: "demo-owner", name: "Chủ Lago", email, role: "OWNER" as const };
        }
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user?.active || !(await compare(password, user.passwordHash))) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as { role: "OWNER" | "STAFF" }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role === "OWNER" ? "OWNER" : "STAFF");
      }
      return session;
    }
  }
});
