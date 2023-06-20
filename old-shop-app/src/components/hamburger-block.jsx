import {createStyles} from "@mantine/core"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import Telegram from "./svg/telegram"
import Youtube from "./svg/youtube"
import Instagram from "./svg/instagram"
import { useEffect, useRef } from "react"

const useStyles = createStyles((theme) => ({
    hamburger: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        right: "0",
        top: "0", 
        width: "75%",
        height: "100%",
        zIndex: "100",
        background: theme.colors.dark[6],
        ul: {
            textAlign: "center",
            a: {
                color: theme.white
            },
            li: {
                padding: "20px",
                '&:hover': {
                    background: theme.colors.dark[5],
                },
            }
        }
    },
    social: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        gap: "30px",
        svg: {
            width: "40px",
            cursor: "pointer",
            fill: theme.white,
        },
        '&:hover': {
            background: theme.colors.dark[5],
        },
    }
}))

export default function HamburgerBlock({open, onToggle}) {
    const {classes} = useStyles()
    const {isAuth} = useAuth()
    const hamburger = useRef()

    useEffect(() => {
        const onClick = (e) => {
            if (!hamburger.current.contains(e.target) && !e.target.getAttribute("data-hamburger")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, hamburger])

    return (
        <div ref={hamburger} className={classes.hamburger}>
            <ul>
                <Link href={"/"}>
                    <li>Главная</li>
                </Link> 
                <Link href={"/about"}>
                    <li>О нас</li>
                </Link>
                <Link href={"/create-record"}>
                    <li>Создай свою пластинку</li>
                </Link>
                <Link href={"/product"}>
                    <li>Готовые пластинки</li>
                </Link>
                {isAuth ? (
                    <Link href={"/user"}>
                        <li>Профиль</li>
                    </Link>
                ) : (
                    <Link href={"/login"}>
                        <li>Вход</li>
                    </Link>
                )}

            </ul>
            <div className={classes.social}>
                <Telegram />
                <Youtube />
                <Instagram />
            </div>
        </div>
    )
}