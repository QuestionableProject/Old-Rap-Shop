import { createStyles } from "@mantine/core";
import EMark from "./svg/eMark";
import Complete from "./svg/complete";

const useStyles = createStyles((theme) => ({
    orders__card: {
        display: "flex",
        justifyContent: "space-between",
        background: theme.colors.dark[7],
        color: theme.white,
        padding: "20px 30px",
        '&:hover': {
            background: theme.colors.dark[6],
        },
        cursor: "pointer",
        borderBottom: `1px solid ${theme.colors.dark[6]}`
    },
    order__number: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    }
}));

export default function OrdersCardAdmin({data}) {
    const { classes } = useStyles()

    const esad = false

    return (
        <div className={classes.orders__card}>
            <div className={classes.order__number}>
                {data.status ? (
                    <Complete />
                ) : (
                    <EMark />
                )}
                <p>Номер: {data.uuid}</p>
            </div>
            <div className="">Статус: {data.status?"Готов":"Не готов"}</div>
            <div className="">Время: {data.createdAt}</div>
        </div>
    )
}