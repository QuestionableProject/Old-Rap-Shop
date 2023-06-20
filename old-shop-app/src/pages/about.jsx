import Header from "@/components/header";
import Layout from "@/components/layout";
import Main from "@/components/main";
import { Carousel } from '@mantine/carousel';
import { createStyles } from "@mantine/core"
import back1 from "@/assets/backimg.jpg"
import back2 from "@/assets/backimg3.jpg"
import back3 from "@/assets/backimg2.jpg"
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { Auth } from "./api/userApi";

const useStyles = createStyles((theme) => ({
    about: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        height: "100%",
        gap: "50px",
        paddingBottom: "20px",
        img: {
            width: "100%",
            height: "100%"
        },
        '@media (max-width: 1000px)': {
            gap: "20px",
            textAlign: "center"
        }
    },
    about__description: {
        display: "grid",
        gap: "50px",
        gridTemplateColumns: "repeat(2, 1fr)",
        p: {
            textAlign: 'justify',
            textIndent: "1.5em"
        },
        '@media (max-width: 1000px)': {
            gridTemplateColumns: "1fr",
        }
    },
    about__text: {
        height: "500px",
        paddingRight: "20px",
        overflowX: "scroll",
            '&::-webkit-scrollbar': {
                width: "5px",
                height: "0",
                background: "hsl(192deg 20% 5% / 60%)",
                borderRadius: "10px"
            },
            '&::-webkit-scrollbar-thumb': {
                background: "hsl(39deg 35% 24% / 30%)",
                borderRadius: "10px",
            },
        '@media (max-width: 1000px)': {
            overflowX: "hidden",
        }
    },
    carousel: {
        '@media (max-width: 1000px)': {
            display: "none"
        }
    }
}))

export default function About() {
    const dispatch = useDispatch()

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

    const { classes } = useStyles()
    return (
        <Layout>
            <Header />

            <Main>
                <section className={classes.about}>
                    <h2>Что мы можем рассказать о себе?</h2>
                    <div className={classes.about__description}>
                        <div className={classes.about__text}>
                            <p>Old Rap Shop - компания, которая занимается продажей виниловых пластинок и созданием собственных пластинок. Мы находимся на рынке уже много лет и за это время мы смогли накопить огромный опыт и стать одним из лидирующих поставщиков виниловых пластинок на территории нашей страны. Присоединяйтесь к нам и откройте для себя мир виниловых пластинок с Old Rap Shop!</p>
                            <p> Мы предлагаем широкий ассортимент виниловых пластинок от лучших исполнителей и музыкальных групп. Наша коллекция включает в себя классические и современные хиты, а также редкие и эксклюзивные записи. Мы постоянно обновляем наш каталог, чтобы предложить вам самые новые и интересные релизы.</p>
                            <p>Кроме того, мы также занимаемся созданием собственных виниловых пластинок. Мы работаем с лучшими звукозаписывающими студиями и профессиональными музыкантами, чтобы создавать настоящие шедевры музыкального искусства. Мы гарантируем высокое качество нашей продукции и уверены, что вы будете довольны ее звучанием.</p>
                            <p> Old Rap Shop - это не только продажа виниловых пластинок, но и настоящая страсть к музыке. Мы стремимся поделиться этой страстью с нашими клиентами и помочь им наслаждаться звуком винила. Мы предлагаем быстрое и удобное оформление заказа, доставку по всей стране и возможность вернуть товар, если он не подошел вам по какой-либо причине.</p>
                        </div>
                        <Carousel className={classes.carousel} slideSize="70%" height={"100%"} slideGap="xs" controlsOffset="xs" loop withControls={true}>
                            <Carousel.Slide><img src={back1.src} alt="photo" /></Carousel.Slide>
                            <Carousel.Slide><img src={back2.src} alt="photo" /></Carousel.Slide>
                            <Carousel.Slide><img src={back3.src} alt="photo" /></Carousel.Slide>
                        </Carousel>
                    </div>
                </section>

            </Main>
        </Layout>
    )
}