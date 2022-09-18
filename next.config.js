/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_API_URL: "https://api.poralia.com/wp-json",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "86I2IfLkPxCW3c56KlYuviTeIsDNqjHi",
    FIREBASE_API_KEY: "AIzaSyDT6hO9tP1pWspJDBOBSNwXJFftvmpNiX8",
    FIREBASE_APP_ID: "1:457979870694:web:69acbdb93093aeb9d0ea27",
    FIREBASE_AUTH_DOMAIN: "poralia-sso.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://poralia-sso-default-rtdb.asia-southeast1.firebasedatabase.app",
    FIREBASE_PROJECT_ID: "poralia-sso",
    FIREBASE_STORAGE_BUCKET: "poralia-sso.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "457979870694",
    LINKEDIN_CLIENT_ID: "86ggdi2mjgoygj",
    LINKEDIN_CLIENT_SECRET: "l6UlcEkldBrnDzXF",
    GOOGLE_CLIENT_ID: "457979870694-gb7kjh6gsmc3583r7fp65bn39qe9gk5l.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  }
}

module.exports = nextConfig
