import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import AuthService from "services/AuthService";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, role, credentials }) {
            const params = {
                email: user.email,
                roleCode: role
            };

            if (credentials) {
                params.email = credentials.email;
                params.password = credentials.password;
            }

            if (account.provider === 'google') {
                params.image = user.image;
                params.name = user.name;
                params.social = 'google';
                params.socialId = user.id;
            }

            try {
                const res = await AuthService.Login(params);
                return res.status === 200;
            } catch (e) {
                return false;
            }
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };