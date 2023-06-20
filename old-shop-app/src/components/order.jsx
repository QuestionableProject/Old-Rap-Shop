import { useCart } from '@/hooks/use-cart';
import { Button, TextInput, createStyles } from '@mantine/core';
import recordDefault from "@/assets/recordDefault.png"
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import CheckMark from './svg/checkmark';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    order: {
        zIndex: 100,
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "80%",
        height: "80%",
        transform: "translate(-50%,-50%)",
        padding: '50px 100px',
        borderRadius: "20px",
        background: theme.white,
        h3: {
            textAlign: "center",
        },
        form: {
            margin: "10px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            label: {
                color: theme.black
            }
        },
        '@media (max-width: 900px)': {
            padding: "50px 10px"
        },
    },
    order__block: {
        display: "flex",
        gap: "100px",
        marginTop: "30px",
        '@media (max-width: 900px)': {
            overflowY: "scroll",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            height: "400px",
        },
        '&::-webkit-scrollbar': {
            width: "5px",
            background: theme.colors.dark[1],
            borderRadius: "10px"
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.colors.dark[4],
            borderRadius: "10px",
        }
    },
    record: {
        position: "relative",
    },
    record__element: {
        width: "200px",
    },
    preimage: {
        maxWidth: "100px",
        maxHeight: "100px",
        objectFit: "cover",
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: -1,
    },
    color__back: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: -2,
    },
    order__check: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        h2: {
            textAlign: "center",
        },
        h2: {
            textAlign: "left",
        },
        gap: "30px"
    },
    order__product: {
        img: {
            width: "100%",
            borderRadius: "5px",
        },
        padding: "10px",
        background: theme.colors.dark[6],
        width: "100px",
        color: theme.white,
        borderRadius: "10px"
    }
}))

export default function Order({ open, onToggle,refElement }) {
    const { classes } = useStyles();
    const orderRef = useRef()
    const { cart } = useCart();

    console.log(refElement.current);

    const formOrder = useForm({
        initialValues: {
            name: '',
            email: '',
            address: '',
            phone: '',
        },
        validate: {
            name: (value) => (value.length <= 0 ? 'Заполните полe' : null),
            email: (value) => (value.length <= 0 ? 'Заполните полe' : null),
            address: (value) => (value.length <= 0 ? 'Заполните полe' : null),
            phone: (value) => (value.length <= 0 ? 'Заполните полe' : null),

        },
    });

    const [order, setOrder] = useState(false)
    const [orderInformation, setOrderInformation] = useState(null)

    useEffect(() => {
        const onClick = (e) => {
            if (!orderRef.current.contains(e.target) && !e.target.getAttribute("data-order") && !refElement.current.contains(e.target)) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, orderRef])

    async function buyProduct(values) {
        const formData = new FormData()
        formData.append('userId', cart?.userId);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('address', values.address);
        formData.append('phone', values.phone);
        formData.append('recordName', cart?.recordName);
        formData.append('recordDescription', cart?.recordDescription);
        formData.append('recordImage', cart?.recordImage);
        formData.append('recordAudio', cart.recordAudio);
        formData.append('options', JSON.stringify(cart.options));

        await fetch('http://localhost:5000/api/order/orderCastom', {
            method: "POST",
            body: formData
        }).then(response => {
            return response.json();
        }).then((data) => {
            if (data.message) {
                setOrder(true)
                setOrderInformation({
                    id: data.id,
                    message: data.message,
                    product: data.product
                })
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
        <div ref={orderRef} className={classes.order}>
            {!order && (
                <section>
                    <h3>Оформление пластинки</h3>
                    <div className={classes.order__block}>
                        <form onSubmit={formOrder.onSubmit(buyProduct)}>
                            <TextInput
                                placeholder='Ваше имя' label="Ваше имя"
                                {...formOrder.getInputProps('name')} />

                            <TextInput
                                placeholder='Ваша почта' label="Ваша почта"
                                {...formOrder.getInputProps('email')}
                            />

                            <TextInput
                                placeholder='Ваш адрес' label="Ваш адрес"
                                {...formOrder.getInputProps('address')}
                            />

                            <TextInput
                                placeholder='Ваш телефон' label="Ваш телефон"
                                {...formOrder.getInputProps('phone')}
                            />

                            <Button
                                size='md'
                                type="submit"
                            >Купить пластинку {cart.prise} ₽</Button>
                        </form>
                        <div className={classes.product}>
                            <div className={classes.record}>
                                <img className={classes.record__element} src={recordDefault.src} alt="Макет пластнки" />
                                {cart.createRecords ? (
                                    cart?.image && <img className={classes.preimage} src={cart?.image} alt="Рисунок пластинки" width={100 / 100 * cart?.options?.widthImage} height={100 / 100 * cart?.options?.heightImage} style={{ objectPosition: `${100 / 100 * cart?.options?.positionX}px ${100 / 100 * cart?.options?.positionY}px` }} />
                                ) : (
                                    cart.audioImage && <img className={classes.preimage} src={cart.audioImage} alt="Рисунок пластинки" />
                                )}
                                <div className={classes.color__back} style={{ background: `${cart?.options?.background}` }}></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {order && (
                <section className={classes.order__check}>
                    <h2>Заказ</h2>
                    <CheckMark />
                    <div className="order__information">
                        <h3>Информация по заказу:</h3>
                        <p>{orderInformation.message}</p>
                        <p><b>Номер заказа:</b> {orderInformation.id}</p>
                        <b>В течение часа, вам позвонит консультант для подтверждения</b>
                    </div>
                </section>
            )}
        </div>
    )
}