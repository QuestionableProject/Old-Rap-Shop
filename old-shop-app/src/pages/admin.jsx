import { useEffect, useState } from "react";
import Error from "./404"
import { createStyles } from "@mantine/core";
import AdminOrders from "@/components/admin-orders";
import AdminUsers from "@/components/admin-users";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
    admin: {
        display: "grid",
        gridTemplateColumns: "20% 80%",
        width: "100%",
        height: "100vh",
        background: theme.colors.dark[8]
    },
    menu: {
        background: theme.colors.dark[5],
        ul: {
            li: {
                padding: "20px",
                color: theme.white,
                cursor: "pointer",
                transition: "background .7s",
                '&:hover': {
                    background: theme.colors.dark[8]
                }
            }
        }
    },
    logo: {
        display: "flex",
        fontWeight: "bold",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        fontSize: "20px",
        color: theme.white,
        cursor: "pointer",
        padding: "0 20px",
        height: "70px",
        cursor: "pointer",
        svg: {
            transition: "transform .7s",
        },
        '&:hover svg': {
            transform: "rotate(-90deg)"
        },
    },
    svg__active: {
        transform: "rotate(-90deg)",
        '&:hover svg': {
            transform: "rotate(-90deg) translateY(10px)"
        },
    },
    admin__block: {
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 50px",
            height: "70px",
            color: theme.white,
            ul: {
                display: "flex",
                gap: "20px",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "15px",
                li: {
                    cursor: "pointer",
                    height: "100%",
                    padding: "35px 20px"
                }
            }
        },
    },
    exit: {
        background: theme.colors.dark[8]
    }

}));

export async function getServerSideProps(context) {
    if (!context.req.cookies['token']) return { props: { userData: false } }
    const auth = await fetch('http://localhost:5000/api/user/auth', {
        headers: {
            'Authorization': `Bearer ${context.req.cookies['token']}`,
        }
    })
    const userData = await auth.json()
    return { props: { userData } }
}

export default function AdminPanel({ userData }) {
    const { classes } = useStyles()
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        if (userData.token) {
            dispatch(setUser({
                token: userData.token,
                image: userData.image,
                nickname: userData.nickname,
                id: userData.id,
                role: userData.role,
            }))
            Cookies.set('token', userData.token, { expires: 365 })
        }
    }, [])

    const [menu, setMenu] = useState(false)

    const [orders, setOrders] = useState(false)
    const [users, setUsers] = useState(false)

    return userData ? (
        <div className={classes.admin}>
            <div className={classes.menu}>
                <div onClick={() => menu ? setMenu(false) : setMenu(true)} className={classes.logo}>
                    <p>OLDRAPSHOP ADMIN</p>
                    <svg className={menu ? classes.svg__active : null} width={20} fill="white" viewBox="0 0 129 129">
                        <g>
                            <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                        </g>
                    </svg>

                </div>
                {menu && (
                    <ul>
                        <li data-orders onClick={() => setOrders(true)}>Заказы</li>
                        <li data-users onClick={() => setUsers(true)}>Управление пользователями</li>
                        <li className={classes.exit} onClick={() => router.push("/user")}>Выйти с панели</li>
                    </ul>
                )}
            </div>
            <section className={classes.admin__block}>
                {orders && (
                    <AdminOrders open={orders} onToggle={setOrders} />
                )}

                {users && (
                    <AdminUsers open={users} onToggle={setUsers} />
                )}

            </section>
        </div>
    ) : (
        <Error />
    )
}
