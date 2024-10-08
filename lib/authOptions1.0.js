// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import db from "./db";
// import { compare } from "bcrypt";

// export const authOptions = {
//   adapter: MongoDBAdapter(db), // Use Prisma adapter to integrate with your DB
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt", // Use JWT to store session information
//   },
//   providers: [
//     EmailProvider({
//       server: process.env.EMAIL_SERVER,
//       from: process.env.EMAIL_FROM,
//       sendVerificationRequest: async ({ identifier, url, provider }) => {
//         // Custom email sending logic
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           scope: 'openid profile email',
//         },
//       },
//       profile: (profile) => {
//         console.log('Google Provider Response:', profile); // Log the entire profile response
//         return {
//           id: profile.sub, // Ensure you include the 'sub' as the id
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("No Inputs Found");
//           }

//           const existingUser = await db.user.findUnique({
//             where: { email: credentials.email },
//           });
//           if (!existingUser) {
//             throw new Error("No user found");
//           }

//           const passwordMatch = await compare(credentials.password, existingUser.password);
//           if (!passwordMatch) {
//             throw new Error("Password Incorrect");
//           }

//           return existingUser;
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     verifyRequest: "/verify-email",
//   },
//   callbacks: {
//     // Handle Google sign-in
//     async signIn({ user, account, profile }) {
//       if (account.provider === "google") {
//         const existingUser = await db.user.findUnique({
//           where: { email: profile.email },
//         });

//         if (!existingUser) {
//           // If the user does not exist, create a new record
//           await db.user.create({
//             data: {
//               email: profile.email,
//               name: profile.name,
//               image: profile.picture,
//               emailVerified: true, // Google already verifies the email
//             },
//           });
//         } else {
//           // Update the user's information if they already exist
//           await db.user.update({
//             where: { email: profile.email },
//             data: {
//               name: profile.name,
//               image: profile.picture,
//             },
//           });
//         }
//       }
//       return true;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.role = token.role;
//         session.user.image = token.picture;
//         session.user.emailVerified = token.emailVerified;
//       }
//       return session;
//     },
//     async jwt({ token, user, account, profile }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = user.role;
//         token.picture = user.image;
//         token.emailVerified = user.emailVerified;
//       }
//       if (account?.provider === "google" && profile) {
//         token.picture = profile.picture;
//       }
//       return token;
//     },
//   },
//   events: {
//     async error(message) {
//       console.error(message);
//     },
//   },
// };
