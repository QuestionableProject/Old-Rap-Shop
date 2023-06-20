import Header from "@/components/header";
import Layout from "@/components/layout";
import Main from "@/components/main";
import { notifications } from "@mantine/notifications";
import Cookies from "js-cookie"
import { useState } from "react";
import { createStyles, Button, Title, TextInput, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useAuth } from "@/hooks/use-auth";

const useStyles = createStyles((theme) => ({
    entrance: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        form: {
            width: "300px",
        },
        label: {
            color: theme.white
        },
        p: {
            cursor: "pointer",
            marginTop: "30px"
        }
    },
    login: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", height: "100%",
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
    return { props: { userData } }
}

export default function Login({ userData }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const {isAuth} = useAuth()

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


    const formEntrance = useForm({
        initialValues: {
            login: '',
            password: '',
        },
        validate: {
            login: (value) => (value.length <= 0 ? 'Заполните полe' : null),
            password: (value) => (value.length <= 0 ? 'Заполните полe' : null),
        },
    });
    const formRegister = useForm({
        initialValues: {
            login: '',
            password: '',
            nickname: '',
            secPassword: '',
        },
        validate: {
            login: (value) => (value.length <= 0 ? 'Заполните полe' : null),
            password: (value) => (value.length <= 0 ? 'Заполните полe' : null),
            nickname: (value) => (value.length <= 0 ? 'Заполните полe' : null),
            secPassword: (value, values) =>
                (value !== values.password ? 'Пароли не совпадают' : null),
        },
    });

    const { classes } = useStyles()

    const [entrance, setEntrance] = useState(false);

    async function entranceFN(values) {
        await fetch('http://localhost:5000/api/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: formEntrance.values.login,
                password: formEntrance.values.password
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.token) {
                console.log(data);
                Cookies.set('token', data.token)
                dispatch(setUser({
                    token: data.token,
                    image: data.image,
                    nickname: data.nickname,
                    id: data.id,
                    role: data.role,
                }))
                router.push('/user');
            }
            if (data.message) {
                notifications.show({
                    autoClose: 2000,
                    message: data.message,
                    withCloseButton: false,
                });
            }
        }).catch((e) => {
            notifications.show({
                autoClose: 2000,
                message: "Возможно, сервер не работает",
                withCloseButton: false,
            });
        });
    }
    async function registerFN(values) {
        await fetch('http://localhost:5000/api/user/registration', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: formRegister.values.login,
                password: formRegister.values.password,
                nickname: formRegister.values.nickname,
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message) {
                notifications.show({
                    autoClose: 2000,
                    message: data.message,
                    withCloseButton: false,
                });
                setEntrance(false)
            }
        }).catch((e) => {
            notifications.show({
                autoClose: 2000,
                message: "Возможно, сервер не работает",
                withCloseButton: false,
            });
        });
    }
    return (
        <Layout>
            <Header />
            <Main>
                {userData.token ? (
                    <section className={classes.login}>
                        <div className={classes.login__block}>
                            <h3>Вы уже вошли</h3>
                            <Button
                                mt="xl"
                                size="md"
                                onClick={() => router.push('/user')}
                            >
                                Перейти в профиль
                            </Button>
                        </div>
                    </section>
                ) : (
                    <section className={classes.entrance}>
                        <Title order={2} align="center" mt="md" mb={50}>
                            {entrance ? "Регистрация" : "Вход"}
                        </Title>
                        {!entrance && (
                            <form onSubmit={formEntrance.onSubmit(entranceFN)}>
                                <TextInput
                                    label="Имя пользователя"
                                    placeholder="Логин"
                                    size="md"
                                    {...formEntrance.getInputProps('login')}
                                />
                                <PasswordInput
                                    label="Пароль"
                                    placeholder="********"
                                    mt="md"
                                    size="md"
                                    {...formEntrance.getInputProps('password')}
                                />
                                <Button
                                    mt="xl"
                                    size="md"
                                    fullWidth
                                    type="submit"
                                >
                                    Войти
                                </Button>
                            </form>
                        )}
                        {entrance && (
                            <form onSubmit={formRegister.onSubmit(registerFN)}>
                                <TextInput
                                    label="Логин для входа"
                                    placeholder="Логин"
                                    size="md"
                                    {...formRegister.getInputProps('login')}
                                />
                                <TextInput
                                    label="Имя пользователя"
                                    placeholder="Никнейм"
                                    size="md"
                                    {...formRegister.getInputProps('nickname')}
                                />
                                <PasswordInput
                                    label="Пароль"
                                    placeholder="********"
                                    mt="md"
                                    size="md"
                                    {...formRegister.getInputProps('password')}
                                />
                                <PasswordInput
                                    label="Повторите пароль"
                                    placeholder="********"
                                    mt="md"
                                    size="md"
                                    {...formRegister.getInputProps('secPassword')}
                                />
                                <Button
                                    mt="xl"
                                    size="md"
                                    type="submit"
                                    fullWidth
                                >
                                    Зарегистрироваться
                                </Button>
                            </form>
                        )}
                        {entrance ? (
                            <p onClick={() => setEntrance(false)}>У меня есть аккаунт</p>
                        ) : (
                            <p onClick={() => setEntrance(true)}>У меня нет аккаунта</p>
                        )}
                    </section>
                )}
            </Main>
        </Layout>
    )
}