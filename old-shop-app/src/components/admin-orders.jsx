import { useEffect, useState } from "react";
import OrdersCardAdmin from "./orders-card-admin";
import { createStyles } from '@mantine/core';
import { useAuth } from "@/hooks/use-auth";

const useStyles = createStyles((theme) => ({
    orders: {
        height: "650px",
        overflowY: "scroll",
        '&::-webkit-scrollbar': {
            width: "5px",
            background: theme.colors.dark[3],
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.colors.dark[5],
        }
    }
}))

export default function AdminOrders({ open, onToggle }) {
    const { classes } = useStyles()

    const [ordersArray, setOrdersArray] = useState()

    const {id} = useAuth()

    useEffect(() => {
        const onClick = (e) => {
            if (!e.target.getAttribute("data-orders")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open])

    useEffect(() => {
        async function getOrders() {
            const response = await fetch(`http://localhost:5000/api/admin/getorders`, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    userId: id
                })
            })

            const data = await response.json()

            setOrdersArray(data)
            console.log(data);
        }
        getOrders()
    }, [])


    return (
        <section className={classes.orders}>
            <header>
                <h1>Заказы</h1>
                <ul>
                    <li>Все</li>
                    <li>Ждут выполнения</li>
                    <li>Новые</li>
                    <li>Старые</li>
                </ul>
            </header>
            <main>
                {ordersArray?.map((e, i)=>
                    <OrdersCardAdmin key={i} data={e}/>
                )}
            </main>
        </section>
    )
}