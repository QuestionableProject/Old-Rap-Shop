import Layout from "@/components/layout";
import { createStyles } from "@mantine/core"
import Main from "@/components/main";
import { useRouter } from "next/router";
import bananacat from "@/assets/bananacatgif.gif"
import { useEffect } from "react";
import { Auth } from "./api/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

const useStyles = createStyles((theme) => ({
    error: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        img: {
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "300px"
        },
        h3: {
            fontSize: "60px"
        },
        p: {
            fontSize: "20px",
            cursor: "pointer"
        }
    },
}))

export default function Error() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { classes } = useStyles()

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

    return (
        <Layout>
            <Main>
                <section className={classes.error}>
                    <h3>Странно, такой страницы нет</h3>
                    <p onClick={() => router.push('/')}>Вернуться назад</p>
                    <img src={bananacat.src} alt="sad" />
                </section>
            </Main>
        </Layout>
    )
}
