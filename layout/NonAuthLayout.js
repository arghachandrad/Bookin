import Head from "next/head"
import Footer from "../components/Footer"
import Header from "../components/Header"

const NonAuthLayout = ({ children, description, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  )
}

export default NonAuthLayout
