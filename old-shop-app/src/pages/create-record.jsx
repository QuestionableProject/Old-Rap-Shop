import Header from "@/components/header";
import Layout from "@/components/layout";
import Main from "@/components/main";

import { createStyles, FileButton, TextInput, Button, Slider,
    ColorInput, Portal, keyframes } from "@mantine/core"

import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from "react";
import recordDefault from "@/assets/recordDefault.png"
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/hooks/use-auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Order from "@/components/order";
import BackgroundModal from "@/components/background-modal";
import { setCart } from "@/store/slices/cartSlice";
import { Auth } from "./api/userApi";
import useSize from "@/hooks/use-size";
import RecordSVG from "@/components/svg/record";
import OptionsSVG from "@/components/svg/options";
import InformationSVG from "@/components/svg/information";
import clsx from "clsx";


export const recordAnimate = keyframes({
    '0%': { transform: 'rotate(0)' },
    '100%': { transform: 'rotate(360deg)' },
});

const useStyles = createStyles((theme) => ({
    createrecords__block: {
        display: "flex",
        gap: "50px",
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "400px",
            label: {
                color: theme.white
            },
            button: {
                transition: "background 1s"
            },
            input: {
                border: 0,
                borderBottom: "2px solid white",
                background: "none",
                paddingLeft: "10px",
                color: theme.white,
                borderRadius: 0,
                '&:focus-within': {
                    borderColor: "white",
                },
            },
        },
    },
    record: {
        position: "relative",
        cursor: "pointer",
        '&:hover': {
            animation: `${recordAnimate} 10s linear infinite`,
        }
    },
    record__element: {
        width: "500px",
        '@media (max-width: 1200px)': {
            width: "270px"
        }
    },
    preimage: {
        maxWidth: "250px",
        maxHeight: "250px",
        objectFit: "cover",
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: -1,
        '@media (max-width: 1200px)': {
            width: "125px"
        }
    },
    imagedesk: {
        fontSize: "13px",
        opacity: ".8"
    },
    options: {
        width: "100%"
    },
    color__back: {
        width: "250px",
        height: "250px",
        objectFit: "cover",
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: -2,
        '@media (max-width: 1200px)': {
            width: "125px", height: "125px",
        }
    },
    options__block: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    descriptionAudio: {
        opacity: ".8",
        fontSize: "15px"
    },
    createrecordsMobile__block: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    information: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "250px",
        label: {
            color: theme.white
        },
        button: {
            transition: "background 1s"
        },
        input: {
            border: 0,
            borderBottom: "2px solid white",
            background: "none",
            paddingLeft: "10px",
            color: theme.white,
            borderRadius: 0,
            '&:focus-within': {
                borderColor: "white",
            },
        },
    },
    btn: {
        display: "flex",
        gap: "20px",
        svg: {
            cursor: "pointer"
        }
    },
    disable: {
        display: "none"
    }
}))

export default function Create() {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        Auth(Cookies.get('token')).then((data) => {
            if (data.token) {
                dispatch(setUser({
                    token: data.token,
                    image: data.image,
                    nickname: data.nickname,
                    id: data.id,
                    role: data.role,
                }))
                Cookies.set('token', data.token, { expires: 365 })
            }
        })
    }, [])

    const { isAuth, id } = useAuth()


    const size = useSize()

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
        },
        validate: {
            name: (value) => (value.length <= 0 ? 'Заполните полe' : null),
        },
    });

    const optionsMobile = useRef()
    const infoMobile = useRef()
    const recordMobile = useRef()
    const orderBtn = useRef()
    const orderBtnMobile = useRef()

    const [fileImage, setFileImage] = useState(null);
    const [fileAudio, setFileAudio] = useState(null);
    const [createImage, setCreateImage] = useState(null);
    const [createAudio, setCreateAudio] = useState(null);
    const [startAudio, setStartAudio] = useState(false);

    const [order, setOrder] = useState(false);

    const [widthImage, setWidthImage] = useState(100);
    const [heightImage, setHeightImage] = useState(100);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [background, setBackground] = useState('#212529');

    if (fileImage) {
        const reader = new FileReader();

        reader.onloadend = function (e) {
            setCreateImage(e.target.result)
        };

        reader.readAsDataURL(fileImage)
    }
    if (fileAudio) {
        const reader = new FileReader();

        reader.onloadend = function (e) {
            setCreateAudio(e.target.result)
        };
        reader.readAsDataURL(fileAudio)
    }

    function orderRecord(values) {
        if (!fileAudio) return notifications.show({
            autoClose: 2000,
            message: "Загрузите трек на пластинку",
            withCloseButton: false,
        });
        dispatch(setCart({
            cart: {
                createRecords: true,
                recordName: values.name,
                recordDescription: values.description,
                image: createImage,
                recordImage: fileImage,
                recordAudio: fileAudio,
                userId: id,
                prise: 10000,
                options: {
                    widthImage: widthImage,
                    heightImage: heightImage,
                    positionX: positionX,
                    positionY: positionY,
                    background: background
                },
            }
        }))
        setOrder(true)
    }

    function audioStart() {
        if (!fileAudio) return false
        setStartAudio(true)
    }
    function audioEnd() {
        if (!fileAudio) return false
        setStartAudio(false)
    }



    function modileRecords() {
        if (recordMobile.current.classList.contains(classes.disable)) {
            recordMobile.current.classList.remove(classes.disable);
            infoMobile.current.classList.add(classes.disable);
            optionsMobile.current.classList.add(classes.disable);
        }
        else {
            recordMobile.current.classList.add(classes.disable);
        }
    }
    function modileInfo() {
        if (infoMobile.current.classList.contains(classes.disable)) {
            infoMobile.current.classList.remove(classes.disable);
            optionsMobile.current.classList.add(classes.disable);
            recordMobile.current.classList.add(classes.disable);
        }
        else {
            infoMobile.current.classList.add(classes.disable);
        }
    }
    function modileOptions() {
        if (optionsMobile.current.classList.contains(classes.disable)) {
            optionsMobile.current.classList.remove(classes.disable);
            recordMobile.current.classList.add(classes.disable);
            infoMobile.current.classList.add(classes.disable);
        }
        else {
            optionsMobile.current.classList.add(classes.disable);
        }

    }
    return (
        <Layout>

            {order && (
                <Portal target="#modal">
                    <Order open={order} onToggle={setOrder} refElement={orderBtn}/>
                </Portal>
            )}

            {order && (
                <Portal target="#modal">
                    <BackgroundModal />
                </Portal>
            )}


            <Header />
            <Main>
                <section className={classes.createrecords}>
                    <h2>Создать картинку просто</h2>
                    {size.width > 1200 ? (
                        <div className={classes.createrecords__block}>
                            {startAudio && (
                                <audio src={createAudio} autoPlay="autoplay"></audio>
                            )}
                            <div className={classes.record} onMouseOver={audioStart} onMouseOut={audioEnd}>
                                <img className={classes.record__element} src={recordDefault.src} alt="imageDefault" />
                                {fileImage && (
                                    <img className={classes.preimage} src={createImage} alt="imagetest" width={250 / 100 * widthImage} height={250 / 100 * heightImage} style={{ objectPosition: `${250 / 100 * positionX}px ${250 / 100 * positionY}px` }} />
                                )}
                                <div className={classes.color__back} style={{ background: `${background}` }}></div>
                            </div>
                            <form onSubmit={form.onSubmit(orderRecord)}>
                                <TextInput label="Имя пластинки"  {...form.getInputProps('name')} />
                                {!fileImage && (
                                    <div>
                                        <FileButton fullWidth styles={(theme) => ({
                                            root: {
                                                background: theme.colors.dark[6],
                                                '&:hover': {
                                                    background: theme.colors.dark[4],
                                                }
                                            }
                                        })} size="xs" onChange={setFileImage} accept="image/png,image/jpeg">
                                            {(props) => <Button {...props}>Загрузить фото</Button>}
                                        </FileButton>
                                        <p className={classes.imagedesk}>Рекомендуем изображение 500x500px</p>
                                    </div>
                                )}

                                {fileImage && (
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
                                            onClick={() => { setFileImage(null); setCreateImage(null) }}
                                        >Удалить: {fileImage.name} </Button>

                                    </div>
                                )}

                                <TextInput label="Описание пластинки" {...form.getInputProps('description')} />
                                {!fileAudio && (
                                    <div>
                                        <FileButton fullWidth styles={(theme) => ({
                                            root: {
                                                background: theme.colors.red[6],
                                                '&:hover': {
                                                    background: theme.colors.dark[4],
                                                }
                                            }
                                        })} size="xs" onChange={setFileAudio} accept="audio/mp3">
                                            {(props) => <Button {...props}>Загрузить трек</Button>}
                                        </FileButton>
                                    </div>
                                )}

                                {fileAudio && (
                                    <div>
                                        <Button
                                            styles={(theme) => ({
                                                root: {
                                                    background: theme.colors.green[6],
                                                    '&:hover': {
                                                        background: theme.colors.dark[4],
                                                    }
                                                }
                                            })}
                                            size="xs"
                                            fullWidth
                                            onClick={() => { setFileAudio(null); setCreateImage(null) }}
                                        >Удалить: {fileAudio.name} </Button>

                                    </div>
                                )}
                                <Button
                                    size="lg" fullWidth
                                    type="submit"
                                    ref={orderBtn}
                                >Купить пластинку за 10000 ₽</Button>
                                {fileAudio && (
                                    <p className={classes.descriptionAudio}>Для тестирования звука наведите на пластинку</p>
                                )}
                            </form>

                            <div className={classes.options}>
                                <h3>Настройка пластинки</h3>
                                <div className={classes.options__block}>
                                    {fileImage && (
                                        <>
                                            <p>Ширина: {widthImage}%</p>
                                            <Slider
                                                color="yellow"
                                                min={0}
                                                max={100}
                                                value={widthImage}
                                                onChange={setWidthImage}
                                            />
                                            <p>Высота: {heightImage}%</p>
                                            <Slider
                                                color="yellow"
                                                min={0}
                                                max={100}
                                                value={heightImage}
                                                onChange={setHeightImage}
                                            />
                                            <p>Позиционирование по X: {positionX} %</p>
                                            <Slider
                                                color="yellow"
                                                min={-100}
                                                defaultValue={0}
                                                max={100}
                                                value={positionX}
                                                onChange={setPositionX}
                                            />
                                            <p>Позиционирование по Y: {positionY} %</p>
                                            <Slider
                                                color="yellow"
                                                min={-100}
                                                defaultValue={0}
                                                max={100}
                                                value={positionY}
                                                onChange={setPositionY}
                                            />
                                        </>
                                    )}
                                    <p>Цвет заднего фона</p>
                                    <ColorInput theme="dark" value={background} onChange={setBackground} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.createrecordsMobile__block}>
                            <p>Мобильная версия конуструктора*</p>
                            <div className={classes.btn}>
                                <RecordSVG onToggle={modileRecords} />
                                <InformationSVG onToggle={modileInfo} />
                                <OptionsSVG onToggle={modileOptions} />
                            </div>
                            <div ref={recordMobile} className={clsx(classes.createrecords__block, classes.disable)}>
                                {startAudio && (
                                    <audio src={createAudio} autoPlay="autoplay"></audio>
                                )}
                                <div className={classes.record} onMouseOver={audioStart} onMouseOut={audioEnd}>
                                    <img className={classes.record__element} src={recordDefault.src} alt="imageDefault" />
                                    {fileImage && (
                                        <img className={classes.preimage} src={createImage} alt="imagetest" width={250 / 100 * widthImage} height={250 / 100 * heightImage} style={{ objectPosition: `${250 / 100 * positionX}px ${250 / 100 * positionY}px` }} />
                                    )}
                                    <div className={classes.color__back} style={{ background: `${background}` }}></div>
                                </div>
                            </div>

                            <div ref={infoMobile} className={classes.disable} >
                                <form  className={classes.information} onSubmit={form.onSubmit(orderRecord)}>
                                    <TextInput label="Имя пластинки"  {...form.getInputProps('name')} />
                                    {!fileImage && (
                                        <div>
                                            <FileButton fullWidth styles={(theme) => ({
                                                root: {
                                                    background: theme.colors.dark[6],
                                                    '&:hover': {
                                                        background: theme.colors.dark[4],
                                                    }
                                                }
                                            })} size="xs" onChange={setFileImage} accept="image/png,image/jpeg">
                                                {(props) => <Button {...props}>Загрузить фото</Button>}
                                            </FileButton>
                                            <p className={classes.imagedesk}>Рекомендуем изображение 500x500px</p>
                                        </div>
                                    )}

                                    {fileImage && (
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
                                                onClick={() => { setFileImage(null); setCreateImage(null) }}
                                            >Удалить: {fileImage.name} </Button>

                                        </div>
                                    )}

                                    <TextInput label="Описание пластинки" {...form.getInputProps('description')} />
                                    {!fileAudio && (
                                        <div>
                                            <FileButton fullWidth styles={(theme) => ({
                                                root: {
                                                    background: theme.colors.red[6],
                                                    '&:hover': {
                                                        background: theme.colors.dark[4],
                                                    }
                                                }
                                            })} size="xs" onChange={setFileAudio} accept="audio/mp3">
                                                {(props) => <Button {...props}>Загрузить трек</Button>}
                                            </FileButton>
                                        </div>
                                    )}

                                    {fileAudio && (
                                        <div>
                                            <Button
                                                styles={(theme) => ({
                                                    root: {
                                                        background: theme.colors.green[6],
                                                        '&:hover': {
                                                            background: theme.colors.dark[4],
                                                        }
                                                    }
                                                })}
                                                size="xs"
                                                fullWidth
                                                onClick={() => { setFileAudio(null); setCreateImage(null) }}
                                            >Удалить: {fileAudio.name} </Button>

                                        </div>
                                    )}
                                    <Button
                                        size="md" fullWidth
                                        type="submit"
                                        ref={orderBtnMobile}
                                        data-order
                                    >Купить пластинку за 10000 ₽</Button>
                                    {fileAudio && (
                                        <p className={classes.descriptionAudio}>Для тестирования звука наведите на пластинку</p>
                                    )}
                                </form>
                            </div>

                            <div ref={optionsMobile} className={clsx(classes.options, classes.disable)}>
                                <h3>Настройка пластинки</h3>
                                <div className={classes.options__block}>
                                    {fileImage && (
                                        <>
                                            <p>Ширина: {widthImage}%</p>
                                            <Slider
                                                color="yellow"
                                                min={0}
                                                max={100}
                                                value={widthImage}
                                                onChange={setWidthImage}
                                            />
                                            <p>Высота: {heightImage}%</p>
                                            <Slider
                                                color="yellow"
                                                min={0}
                                                max={100}
                                                value={heightImage}
                                                onChange={setHeightImage}
                                            />
                                            <p>Позиционирование по X: {positionX} %</p>
                                            <Slider
                                                color="yellow"
                                                min={-100}
                                                defaultValue={0}
                                                max={100}
                                                value={positionX}
                                                onChange={setPositionX}
                                            />
                                            <p>Позиционирование по Y: {positionY} %</p>
                                            <Slider
                                                color="yellow"
                                                min={-100}
                                                defaultValue={0}
                                                max={100}
                                                value={positionY}
                                                onChange={setPositionY}
                                            />
                                        </>
                                    )}
                                    <p>Цвет заднего фона</p>
                                    <ColorInput theme="dark" value={background} onChange={setBackground} />
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </Main>
        </Layout >
    )
}