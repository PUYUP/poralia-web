/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BASE_API_URL: "http://localhost/www/wp/poralia/wp-json",
    NEXT_PUBLIC_NEXTAUTH_URL: "http://localhost:3000",
    NEXT_PUBLIC_NEXTAUTH_SECRET: "86I2IfLkPxCW3c56KlYuviTeIsDNqjHi",
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDT6hO9tP1pWspJDBOBSNwXJFftvmpNiX8",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:457979870694:web:69acbdb93093aeb9d0ea27",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "poralia-sso.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: "https://poralia-sso-default-rtdb.asia-southeast1.firebasedatabase.app",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "poralia-sso",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "poralia-sso.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "457979870694",
    NEXT_PUBLIC_LINKEDIN_CLIENT_ID: "86ggdi2mjgoygj",
    NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET: "l6UlcEkldBrnDzXF",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: "457979870694-gb7kjh6gsmc3583r7fp65bn39qe9gk5l.apps.googleusercontent.com",
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: "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",
  }
}

module.exports = nextConfig
