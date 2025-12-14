// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { compare, hash } from 'bcryptjs';
import { db } from './db';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValid = await compare(credentials.password, user.password);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    plan: user.plan
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    email: profile.email,
                    name: profile.name,
                    image: profile.picture
                };
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    email: profile.email,
                    name: profile.name || profile.login,
                    image: profile.avatar_url
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.plan = user.plan;
            }

            if (account) {
                token.accessToken = account.access_token;
                token.provider = account.provider;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.plan = token.plan as string;
            }

            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === 'credentials') {
                return true;
            }

            // Handle OAuth sign in
            const existingUser = await db.user.findUnique({
                where: { email: user.email! }
            });

            if (!existingUser) {
                await db.user.create({
                    data: {
                        email: user.email!,
                        name: user.name,
                        image: user.image,
                        provider: account?.provider
                    }
                });
            } else if (!existingUser.provider) {
                // Update existing user with OAuth provider
                await db.user.update({
                    where: { email: user.email! },
                    data: {
                        provider: account?.provider,
                        image: user.image || existingUser.image
                    }
                });
            }

            return true;
        }
    },
    pages: {
        signIn: '/signin',
        signUp: '/signup',
        error: '/signin'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
};

// Helper functions
export async function createUser(email: string, password: string, name?: string) {
    const hashedPassword = await hash(password, 12);

    return await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            provider: 'credentials'
        }
    });
}

export async function updateUserProfile(userId: string, data: { name?: string; image?: string }) {
    return await db.user.update({
        where: { id: userId },
        data
    });
}

export async function changePassword(userId: string, newPassword: string) {
    const hashedPassword = await hash(newPassword, 12);

    return await db.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
    });
}

export async function deleteUser(userId: string) {
    return await db.user.delete({
        where: { id: userId }
    });
}