import Header from "@/components/header";
import Layout from "@/components/layout";
import { createStyles, Button } from "@mantine/core"
import Main from "@/components/main";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { Auth } from "./api/userApi";

const useStyles = createStyles((theme) => ({
  home__page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: "100%",
    gap: "50px",
  },
  preview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "800px",
    textAlign: "center",
    gap: "20px",
    button: {
      background: theme.colors.yellow[4],
      transition: "background 1s"
    },
    h2: {
      color: "white",
      fontSize: "40px",
      '@media (max-width: 1000px)': {
        fontSize: "30px",
      }
    },
    '@media (max-width: 1000px)': {
      width: "auto"
    }
  }
}))

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    Auth(Cookies.get('token')).then((data) => {
      if (data.token) {
        dispatch(setUser({
          token: data.token,
          image: data.image,
          nickname: data.nickname,
          id: data.id,
          role: data.role,
        }))
        Cookies.set('token', data.token, { expires: 365 })
      }
    })
  }, [])

  const router = useRouter()
  const { classes } = useStyles()

  return (
    <Layout>
      <Header />

      <Main>
        <section className={classes.home__page}>
          <div className={classes.preview}>
            <h2>Сохраняй в памяти любимые песни вместе с Old Rap Shop</h2>
            <Button
              size="lg"
              onClick={() => router.push('/create-record')}
            >Создать пластинку!</Button>
          </div>
        </section>
      </Main>
    </Layout>
  )
}
