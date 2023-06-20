import Header from "@/components/header";
import Layout from "@/components/layout";
import Main from "@/components/main";
import { createStyles, Button, Input, FileButton, Portal } from "@mantine/core"
import { useRouter } from "next/router";
import defaultPhoto from "@/assets/defaultPhoto.png"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "@/store/slices/userSlice";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import DraftCard from "@/components/draft-card";
import AlertRemove from "@/components/alert-remove";
import BackgroundModal from "@/components/background-modal";
import OrdersCard from "@/components/orders-card";
import { useAuth } from "@/hooks/use-auth";

const useStyles = createStyles((theme) => ({
    user: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",

    },
    nickname: {
        fontSize: "40px"
    },
    user__container: {
        position: "relative",
        height: "50%",
        margin: "0 -50px",
        background: `rgb(26,20,20, 40%)`,
        padding: "30px 100px 0 450px ",
    },
    user__img: {
        width: "250px", height: "250px",
        position: "absolute",
        left: "30px", top: "0",
        borderRadius: "50%",
        objectFit: "cover",
        transform: "translate(50%,-50%)",
        border: `10px solid rgb(26,20,20, 40%)`,
    },
    text: {
        display: "flex",
        alignItems: "flex-end",
        paddingLeft: "400px",
        flex: "1",

    },
    user__information: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        ul: {
            display: "flex",
            gap: "20px",
            li: {
                cursor: "pointer",
                transition: "1s color",
                '&:hover': {
                    color: theme.colors.yellow[4],
                }
            }
        }
    },
    active: {
        color: theme.colors.yellow[4],
    },
    options: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "20px",
        ul: {
            input: {
                background: "none",
                border: "0",
                borderBottom: `1px solid ${theme.white}`,
                color: 'white',
                borderRadius: "0",
                '&:focus': {
                    borderBottom: `1px solid ${theme.white}`,
                }
            },
            li: {
                opacity: ".5",
                cursor: "pointer",
                transition: "1s all",
                '&:first-child': {
                    opacity: "1",
                    cursor: "default"
                },
                '&:hover': {
                    opacity: ".8",
                }
            }
        }
    },
    user__decline: {
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        gap: "100px",
        margin: "0 -50px",
        background: "#1b17178f",
        padding: "10px 50px",
        p: {
            opacity: ".5",
            cursor: "pointer",
            '&:first-child': {
                opacity: ".8"
            },
            '&:last-child': {
                color: theme.colors.red
            }
        }
    },
    login: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", height: "100%",
        textAlign: "center",
    },
    login__block: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "30px",
        borderRadius: "10px",
        width: "500px",
        background: `rgb(26,20,20, 40%)`,
    },
    rename: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        margin: "10px 0"
    },
    draft: {
        display: "flex",
        gap: "30px",
        paddingBottom: "20px",
        overflowX: "scroll",
        marginRight: "-100px",
        height: "100%",
        '&::-webkit-scrollbar': {
            height: "3px",
            background: theme.colors.dark[3],
            borderRadius: "20px"
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.colors.dark[5],
            borderRadius: "20px"
        }
    },
    orders: {
        display: "flex",
        gap: "30px",
        paddingBottom: "20px",
        overflowX: "scroll",
        height: "100%",
        marginRight: "-100px",
        '&::-webkit-scrollbar': {
            height: "3px",
            background: theme.colors.dark[3],
            borderRadius: "20px"
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.colors.dark[5],
            borderRadius: "20px"
        }
    }
}))

export async function getServerSideProps(context) {
    if (!context.req.cookies['token']) return { props: { userData: false } }
    const auth = await fetch('http://localhost:5000/api/user/auth', {
        headers: {
            'Authorization': `Bearer ${context.req.cookies['token']}`,
        }
    })
    const userData = await auth.json()

    const orders = await fetch(`http://localhost:5000/api/order/getOrders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userData.id
        })
    })
    const data = await orders.json()
    return { props: { userData, data } }
}

export default function User({ userData, data}) {
    const dispatch = useDispatch()

    const { nickname } = useAuth()

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
    const router = useRouter()
    const { classes } = useStyles()

    const renameForm = useForm({
        initialValues: {
            name: '',
        },
        validate: {
            name: (value) => (value.length <= 0 ? 'Заполните полe' : null),
        },
    });

    const [alertRemove, setAlertRemove] = useState(false)

    const [options, setOptions] = useState(false)
    const [orders, setOrders] = useState(false)

    const [rename, setRename] = useState(false)
    const [reimage, setReimage] = useState(false)
    const [file, setFile] = useState(null);
    const [createImage, setCreateImage] = useState(null);

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function (e) {
            setCreateImage(e.target.result)
        };

        reader.readAsDataURL(file)
    }


    async function renameFN(values) {
        await fetch('http://localhost:5000/api/user/userrename', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userData.id,
                name: values.name
            })
        })
            .then(response => { return response.json() })
            .then((data) => {
                if (data.message) {
                    notifications.show({
                        autoClose: 2000,
                        message: data.message,
                        withCloseButton: false,
                    });
                    console.log(data);
                    dispatch(setUser({
                        token: data.token,
                        image: data.image,
                        nickname: data.nickname,
                        id: data.id,
                        role: data.role,
                    }))
                    userData.nickname = data.nickname
                    Cookies.set('token', data.token, { expires: 365 })
                }
            })
            .catch((e) => {
                notifications.show({
                    autoClose: 5000,
                    message: "Возможно, сервер не работает",
                    withCloseButton: false,
                });
            })
    }
    async function updateImage() {
        if (!file) return notifications.show({
            autoClose: 2000,
            message: "Загрузите фотографию",
            withCloseButton: false,
        });

        const formData = new FormData()
        formData.append("userId", userData.id)
        formData.append('image', file)

        await fetch('http://localhost:5000/api/user/userupdateimage', {
            method: "POST",
            body: formData
        })
            .then(response => { return response.json() })
            .then((data) => {
                if (data.message) {
                    notifications.show({
                        autoClose: 2000,
                        message: data.message,
                        withCloseButton: false,
                    });
                    console.log(data);
                    dispatch(setUser({
                        token: data.token,
                        image: data.image,
                        nickname: data.nickname,
                        id: data.id,
                        role: data.role,
                    }))
                    userData.image = data.image

                    setFile(null)
                    Cookies.set('token', data.token, { expires: 365 })
                }
            })
            .catch((e) => {
                notifications.show({
                    autoClose: 5000,
                    message: "Возможно, сервер не работает",
                    withCloseButton: false,
                });
            })
    }

    async function removeProfile() {
        await fetch('http://localhost:5000/api/user/removeuser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userData.id
            })
        })
            .then(response => { return response.json() })
            .then((data) => {
                dispatch(removeUser());
                Cookies.set("token", "");
                router.push("/login");
                notifications.show({
                    autoClose: 2000,
                    message: data.message,
                    withCloseButton: false,
                });
            })
            .catch((e) => {
                notifications.show({
                    autoClose: 5000,
                    message: "Возможно, сервер не работает",
                    withCloseButton: false,
                });
            })
    }
    return (
        <Layout>
            <Header />
            <Main>
                {alertRemove && (
                    <Portal target="#modal">
                        <AlertRemove open={alertRemove} onToggle={setAlertRemove} toggleRemove={removeProfile} />
                    </Portal>
                )}
                {alertRemove && (
                    <Portal target="#modal">
                        <BackgroundModal />
                    </Portal>
                )}

                {userData.token ? (
                    <section className={classes.user}>
                        <div className={classes.text}>
                            <div className={classes.user__information}>
                                <p className={classes.nickname}>
                                    {nickname}
                                </p>
                                <ul>
                                    {userData.role === "admin" && <li onClick={() => router.push("/admin")} className={classes.active}>Админ панель</li>}
                                    <li onClick={() => { setOrders(true); setOptions(false); }} className={orders ? classes.active : null}>Мои покупки</li>
                                    <li onClick={() => { setOptions(true); setOrders(false) }} className={options ? classes.active : null}>Настройки</li>
                                </ul>
                            </div>
                        </div>
                        <div className={classes.user__container}>
                            {file ? (
                                <img className={classes.user__img} src={createImage} alt="Фото пользователя" />
                            ) : (
                                <img className={classes.user__img} src={userData.image ? userData.image : defaultPhoto.src} alt="Фото пользователя" />
                            )}
                            {options && (
                                <div className={classes.options}>
                                    <ul>
                                        <li>Профиль</li>
                                        <li onClick={() => { rename ? setRename(false) : setRename(true) }}>Изменить имя</li>
                                        {rename && (
                                            <form className={classes.rename} onSubmit={renameForm.onSubmit(renameFN)}>
                                                <Input placeholder="Новое имя"
                                                    {...renameForm.getInputProps('name')}
                                                />
                                                <Button
                                                    size="xs"
                                                    fullWidth
                                                    type="submit"
                                                >Сохранить</Button>
                                            </form>
                                        )}
                                        <li onClick={() => { reimage ? setReimage(false) : setReimage(true) }}>Изменить фото</li>
                                        {reimage && (
                                            <div className={classes.rename}>
                                                {!file && (
                                                    <div>
                                                        <FileButton fullWidth styles={(theme) => ({
                                                            root: {
                                                                background: theme.colors.dark[6],
                                                                '&:hover': {
                                                                    background: theme.colors.dark[4],
                                                                }
                                                            }
                                                        })} size="xs" onChange={setFile} accept="image/png,image/jpeg">
                                                            {(props) => <Button {...props}>Загрузить фото</Button>}
                                                        </FileButton>
                                                    </div>
                                                )}

                                                {file && (
                                                    <div>
                                                        <Button
                                                            styles={(theme) => ({
                                                                root: {
                                                                    background: theme.colors.dark[6],
                                                                    '&:hover': {
                                                                        background: theme.colors.dark[4],
                                                                    }
                                                                }
                                                            })}
                                                            size="xs"
                                                            fullWidth
                                                            onClick={() => { setFile(null); setCreateImage(null) }}
                                                        >Удалить: {file.name} </Button>

                                                    </div>
                                                )}
                                                <Button size="xs" fullWidth onClick={updateImage}>Сохранить</Button>
                                            </div>
                                        )}
                                    </ul>
                                    <ul>
                                        <li>О магазине</li>
                                        <li>Помощь</li>
                                    </ul>
                                </div>
                            )}
                            {orders && (
                                <div className={classes.orders}>
                                    {data.message ? (
                                        <div>Заказов нет</div>
                                    ) : (
                                        data.map((e, i) =>
                                            <OrdersCard key={i} data={e}/>
                                        )
                                    )}

                                </div>
                            )}
                        </div>
                        <div className={classes.user__decline}>
                            <p onClick={
                                () => {
                                    dispatch(removeUser());
                                    Cookies.set("token", "");
                                    router.push("/")
                                }
                            }>Выйти</p>
                            <p
                                onClick={() => setAlertRemove(true)}
                            >Удалить акккаунт</p>
                        </div>
                    </section>
                ) : (
                    <section className={classes.login}>
                        <div className={classes.login__block}>
                            <h3>Чтобы совершать покупки и отслеживать товары, войдите в аккаунт</h3>
                            <Button
                                mt="xl"
                                size="md"
                                onClick={() => router.push('/login')}
                            >
                                Войти в аккаунт
                            </Button>
                        </div>
                    </section>
                )}
            </Main>
        </Layout>
    )
}