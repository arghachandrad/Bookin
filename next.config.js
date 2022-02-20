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
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
}
