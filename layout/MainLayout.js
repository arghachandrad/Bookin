import Head from "next/head"
import Footer from "../components/Footer"
import Header from "../components/Header"

import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "../redux/actions/auth"
import { useEffect } from "react"

const MainLayout = ({ children, description, title }) => {
  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

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

export default MainLayout
