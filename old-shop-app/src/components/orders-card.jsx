import { Button, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    order: {
        display: "flex",
        flexDirection: "column",
        justifyContent:"space-between",
        background: theme.colors.dark[7],
        minWidth: "400px",
        height: "200px",
        borderRadius: "20px",
        padding: "20px 40px 20px 40px",
        cursor: "pointer",
        transition: "background 1s",
        '&:hover': {
            background: theme.colors.dark[6],
        }
    },
}));

export default function OrdersCard({data}) {
    const { classes } = useStyles()
    console.log(data);
    return (
        <div className={classes.order}>
            <h3>Заказ: {data.uuid}</h3>
            <div className="information">
                {data.status?(
                    <p>Статус заказа: Готов</p>
                ):(
                    <p>Статус заказа: Не готов</p>
                )}
            </div>
        </div>
    )
}