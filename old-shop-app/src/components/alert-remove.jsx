import { Button, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    remove: {
        position: "absolute",
        top: "50%",
        left: "50%",
        height: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        height: "250px",
        zIndex: 100,
        padding: "30px",
        background: theme.white,
        display: "flex",
        borderRadius: "20px",
        flexDirection: "column",
        justifyContent: "space-between",
        h1: {
            textAlign: "center"
        },
        div: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: {
                color: theme.colors.red[3],
                cursor: "pointer",
                opacity: "0.8",
                transition: "color 1s",
                '&:hover': {
                    color: theme.colors.red[8]
                }
            }
        }
    }
}));


export default function AlertRemove({ open, onToggle, toggleRemove }) {
    const { classes } = useStyles()
    return (
        <div className={classes.remove}>
            <h1>Вы уверены, что хотите удалить аккаунт?</h1>
            <div>
                <Button onClick={() => onToggle(false)}>Нет, я передумал</Button>
                <p onClick={toggleRemove}>Да, удалить мой аккаунт навсегда</p>
            </div>
        </div>
    )
}