import { createStyles } from "@mantine/core";
import UpUser from "./svg/upuser";
import DownUser from "./svg/downuser";
import Trash from "./svg/trash";


const useStyles = createStyles((theme) => ({
    user__card: {
        display: "flex",
        alignItems: "center",
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
    user__name: {
        display: "flex",
        gap: "20px",
    },
    btn: {
        display: "flex",
        gap: "30px",
        svg: {
            transition: "border 1s",
        },
        [`&:hover > :not(:hover)`]: {
            opacity: .3
        },
    },
    role: {
        display: 'flex',
        gap: "10px"
    }
}));

export default function UserCard({ data }) {
    const { classes } = useStyles()

    async function userUp() {

    }
    async function userDown() {

    }
    async function userRemove() {

    }
    return (
        <div className={classes.user__card}>
            <div className={classes.user__name}>
                <p>Логин: {data.login}</p>
                <p>Никнейм: {data.nickname}</p>
            </div>
            <p className={classes.role}>
                <p>Роль:</p>
                {data.role == "admin"?(
                    <span style={{color: "yellow"}}>Админ</span>
                ):(
                    <span>Пользователь</span>
                )}
            </p>
            <div className={classes.btn}>
                <DownUser />
                <UpUser />
                <Trash />
            </div>
            <p>Дата регистрации: {data.createdAt}</p>
        </div>
    )
}