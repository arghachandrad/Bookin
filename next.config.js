module.exports = {
  env: {
    DB_URI: "mongodb://localhost:27017/bookin",
    NEXT_LOCAL_BASE_URL: "http://localhost:3000/api",
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

    STRIPE_WEBHOOK_SECRET:
      "whsec_71de4da336489d2534fcd1204361e4ae1b748ca100691de490bc84a097785b6a",
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
}
