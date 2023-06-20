import Header from "@/components/header";
import Layout from "@/components/layout";
import Cookies from "js-cookie";
import { setUser } from "@/store/slices/userSlice";
import recordDefault from "@/assets/recordDefault.png"
import Main from "@/components/main";
import { Button, Portal, createStyles } from "@mantine/core"
import { useDispatch } from "react-redux";
import Order from "@/components/order";
import BackgroundModal from "@/components/background-modal";
import { useEffect, useRef, useState } from "react";
import { setCart } from "@/store/slices/cartSlice";
import { Auth } from "../api/userApi";

const useStyles = createStyles((theme) => ({
    section__record: {
        display: "grid",
        gridTemplateColumns: "500px 1fr",
        gap: "50px",
    },
    img__block: {
        width: "500px",
        borderRadius: "20px"
    },
    record__information: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "50px",
        width: "100%",
    },
    information__text: {
        display: "flex",
        justifyContent: "space-between"
    },
    album: {
        width: "150px",
        border: "5px solid white",
        borderRadius: "10px"
    },
    record__block: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    record: {
        position: "relative",
        transition: "all 10s",
        '&:hover': {
            transform: "rotate(360deg)"
        }
    },
    record__element: {
        width: "300px",
    },
    preimage: {
        width: "50%",
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: -1,
    },
}))

export async function getServerSideProps(context) {
    const { id } = context.params
    const record = await fetch(`http://localhost:5000/api/records/${id}`)
    const data = await record.json()

    return { props: { data } }
}

export default function ProductOne({ data }) {
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
    const { classes } = useStyles();

    const [order, setOrder] = useState(false);

    const orderBtn = useRef()

    function orderRecord() {
        dispatch(setCart({
            cart: data
        }))
        setOrder(true)
    }
    return (
        <Layout>
            {order && (
                <Portal target="#modal">
                    <Order open={order} onToggle={setOrder} refElement={orderBtn} />
                </Portal>
            )}

            {order && (
                <Portal target="#modal">
                    <BackgroundModal />
                </Portal>
            )}
            <Header />
            <Main>
                <section className={classes.section__record}>
                    <div className={classes.img__block} style={{ background: `url('${data.audioImage}')`, backgroundSize: "cover" }}>
                    </div>
                    <div className={classes.record__information}>
                        <div className={classes.information__text}>
                            <div>
                                <h1 style={{ fontSize: "60px" }}>{data.actor}</h1>
                                <h1>{data.audioName}</h1>
                            </div>
                            {data.album && (
                                <img className={classes.album} src={data.albumImage} alt={data.audioName} />
                            )}
                        </div>
                        <div className={classes.record__block}>
                            <div className={classes.record}>
                                <img className={classes.record__element} src={recordDefault.src} alt="records" />
                                <img className={classes.preimage} src={data.audioImage} alt={data.audioName} width={50} />
                            </div>

                            <Button
                                size="lg"
                                onClick={orderRecord}
                                ref={orderBtn}
                            >Купить за {data.prise} ₽</Button>

                        </div>
                    </div>
                </section>
            </Main>
        </Layout>
    )
}