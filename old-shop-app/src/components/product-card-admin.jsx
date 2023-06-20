import { Avatar, createStyles, getStylesRef } from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    product__card: {
        display: "flex",
        flexDirection: "column",
        width: "200px",
        height: "300px",
        boxShadow: "0 10px 10px 0 rgb(0 0 0 / 20%)",
        position: "relative",
        borderRadius: "10px",
        img: {
            maxWidth: "100%",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "10px",
        },
    },
    product__image: {
        height: "200px",
        borderRadius: "10px",
    },

    album: {
        width: "70px", height: "70px",
        position: "absolute",
        top: "-30px", right: "-30px",
        transform: "rotate(-30deg)",
        border: "5px solid white",
        borderRadius: "10px",
        background: theme.white
    },
    product__text: {
        fontSize: "15px",
        color: theme.white,
        flex: "1"
    },
    add__album: {
        width: "100%",
        height: "100%",
        fontSize: "40px",
        color: theme.colors.red[5],
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function ProductCardAdmin({ data }) {
    const { classes } = useStyles()

    return (
        <Link href={`/product/${data.id}`}>
            <div className={classes.product__card}>
                <div className={classes.album}>
                    {data.album? (
                        <img src={data.albumImage} alt={data.album} />
                    ):(
                        <div className={classes.add__album}>
                            +
                        </div>
                    )}

                </div>
                <div className={classes.product__image} style={{ background: `url('${data.audioImage}')`, backgroundSize: "cover" }}>
                </div>
                <div className={classes.product__text}>
                    <p>{data.actor} - {data.audioName}</p>
                    <p style={{ whiteSpace: "nowrap" }}>{data.prise} ₽</p>
                </div>
            </div>
        </Link>
    )
}