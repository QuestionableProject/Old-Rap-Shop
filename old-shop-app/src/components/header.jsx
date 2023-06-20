import Logo from "./svg/logo";
import { Portal, createStyles } from '@mantine/core';
import Telegram from "./svg/telegram";
import Youtube from "./svg/youtube";
import Instagram from "./svg/instagram";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import HamburgerMenu from "./svg/hamburger-menu";
import { useState } from "react";
import HamburgerBlock from "./hamburger-block";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        a: {
            color: theme.white
        },
    },
    menu: {
        display: "flex",
        alignItems: "center",
        gap: "50px",
        ul: {
            display: "flex",
            alignItems: 'center',
            gap: "25px",
            li: {
                opacity: ".8",
                transition: "opacity 1s",
                '&:hover': {
                    opacity: 1
                }
            },
            '@media (max-width: 1000px)': {
                display: "none"
            }
        },
        svg: {
            fill: theme.colors.yellow[4],
            width: "150px",
        },

    },
    social: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        svg: {
            height: "35px",
            fill: theme.white,
            cursor: "pointer",
            opacity: ".8",
            transition: "opacity 1s",
            '&:hover': {
                opacity: 1
            }
        },
        '@media (max-width: 1000px)': {
            display: "none"
        }
    },
    hamburger: {
        display: "flex",
        alignItems: "center",
        svg: {
            cursor: "pointer"
        },
        '@media (min-width: 1000px)': {
            display: "none"
        }
    }
}))
export default function Header() {
    const { classes } = useStyles();

    const { isAuth } = useAuth()

    const [hamburger, setHamburger] = useState(false)

    return (
        <header className={classes.header}>
            {hamburger && (
                <Portal target="#modal">
                    <HamburgerBlock open={hamburger} onToggle={setHamburger} />
                </Portal>
            )}

            <div className={classes.menu}>
                <Logo />
                <ul>
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
            </div>
            <div className={classes.social}>
                <Link href={"https://telegram.org/"}>
                    <Telegram />
                </Link>
                <Link href={"https://www.youtube.com/"}>
                    <Youtube />

                </Link>
                <Link href={"https://www.instagram.com/"}>
                    <Instagram />
                </Link>
            </div>
            <div className={classes.hamburger} data-hamburger>
                <HamburgerMenu onToggle={setHamburger} />
            </div>
        </header>
    )
}