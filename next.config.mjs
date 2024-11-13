/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RESEND_API_KEY: "re_ZacMr3bG_MZCB3tg788UrUieq3XgMh3hX",
    API_KEY: process.env.API_KEY,
    //when the server is run locally, I believe this key is "whatever"
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
