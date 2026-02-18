export default function EnvCheck() {
    console.log("DB URL:", process.env.DATABASE_URL ? "Set" : "Not Set");
    console.log("NextAuth Secret:", process.env.AUTH_SECRET ? "Set" : "Not Set");
    return <div>Check server console</div>;
}
