module.exports = {
  env: {
    // DB_URI: "mongodb://localhost:27017/bookin",
    NEXT_LOCAL_BASE_URL: "https://bookin.vercel.app/api",
    DB_URI:
      "mongodb+srv://arghachandrad:ArghaDas007@cluster0.w9fog.mongodb.net/bookin?retryWrites=true&w=majority",
    CLOUDINARY_CLOUD_NAME: "dnbqxtbxe",
    CLOUDINARY_API_KEY: "123635351991264",
    CLOUDINARY_API_SECRET: "c1D1YGoKnVb1SFUJb_8BEMiDMRE",

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "884a3b094a2861",
    SMTP_PASSWORD: "273ad34343b6fd",
    SMTP_FROM_NAME: "Bookin",
    SMTP_FROM_EMAIL: "noreply@bookin.com",

    STRIPE_API_KEY:
      "pk_test_51KSNXgSHgux1UBX9CKTcSCbIQFqHE4CYrfyBudEzrr2QNNYodvOyEsvJL2IlQmduMplHNO4i8uwvxXxbHH4uWaAL00yiuQVW1i",

    STRIPE_SECRET_KEY:
      "sk_test_51KSNXgSHgux1UBX9VtvAuUyxmV0HVj5eES8tialLqC4UVkhAchiD9grVf2UxhbsGXf9LGqh015ztQxovZsA9TL8D00qpdrob6G",

    STRIPE_WEBHOOK_SECRET: "whsec_CGroIGOtcGCCDmJkhI1wh4MydtH1pnyC",

    NEXTAUTH_URL: "https://bookin.vercel.app",
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
}
