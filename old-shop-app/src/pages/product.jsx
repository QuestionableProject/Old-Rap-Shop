import Header from "@/components/header";
import Layout from "@/components/layout";
import Main from "@/components/main";
import ProductCard from "@/components/product-card";
import Cookies from "js-cookie";
import { setUser } from "@/store/slices/userSlice";
import { createStyles } from "@mantine/core"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Auth } from "./api/userApi";

const useStyles = createStyles((theme) => ({
    product: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        color: theme.white,
        h2: {
            fontSize: "30px"
        }
    },
    product__block: {
        display: "flex",
        gap: '80px',
        flexWrap: "wrap",
        overflowY: "scroll",
        height: "500px",
        padding: "50px",

        '&::-webkit-scrollbar': {
            width: "5px",
            background: "hsl(192deg 20% 5% / 60%)",
            borderRadius: "10px"
        },
        '&::-webkit-scrollbar-thumb': {
            background: "hsl(39deg 35% 24% / 30%)",
            borderRadius: "10px",
        }
    }
}))

export default function Product() {
    const dispatch = useDispatch()
    const [record, setRecords] = useState(null)

    useEffect(() => {
        const response = Auth(Cookies.get('token'));
        if (response.token) {
            dispatch(setUser({
                token: response.token,
                image: response.image,
                nickname: response.nickname,
                id: response.id,
                role: response.role,
            }))
            Cookies.set('token', response.token, { expires: 365 })
        }
        async function getRecords() {
            const records = await fetch(`http://localhost:5000/api/records`)
            const data = await records.json()
            setRecords(data)
        }
        getRecords()
    }, [])


    const { classes } = useStyles()

    return (
        <Layout>
            <Header />
            <Main>
                <section className={classes.product}>
                    <h2>Готовые пластинки</h2>
                    <div className={classes.product__block}>
                        {record?.map(e =>
                            <ProductCard key={e.id} data={e} />
                        )}
                    </div>
                </section>
            </Main>

        </Layout>
    )
}