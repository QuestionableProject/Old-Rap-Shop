import { createStyles,getStylesRef } from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    product__card: {
        display: "flex",
        flexDirection: "column",
        width: "350px",
        height: "400px",
        boxShadow: "0 10px 10px 0 rgb(0 0 0 / 20%)",
        position: "relative",
        borderRadius: "10px",
        img: {
            maxWidth:"100%",
            objectFit: "cover",
            borderRadius: "10px",
        },

        [`&:hover .${getStylesRef('product__image')}`]: {
            flex: "2 1 100%"
        },
    },
    product__image: {
        ref: getStylesRef('product__image'),
        transition: "height 1s",
        flex: "2",
        transition: "flex 1s",
        borderRadius: "10px",
    },

    album: {
        width: "100px", height: "100px",
        position: "absolute",
        top: "-30px", right: "-30px",
        transform: "rotate(-30deg)",
        border: "5px solid white",
        borderRadius: "10px"
    },
    product__text: {
        display: "flex",
        justifyContent: "space-between",
        gap: "50px",
        padding: "10px 20px",
        fontSize: "20px",
        fontWeight: "bold",
        color: theme.white,
        flex: "1"
    }
}))

export default function ProductCard({ data }) {
    const { classes } = useStyles()

    return (
        <Link href={`/product/${data.id}`}>
            <div className={classes.product__card}>
                {data.album && (
                    <div className={classes.album}>
                        <img src={data.albumImage} alt={data.album} />
                    </div>
                )}
                <div className={classes.product__image} style={{background: `url('${data.audioImage}')`, backgroundSize: "cover"}}>
                </div>
                <div className={classes.product__text}>
                    <p>{data.actor} - {data.audioName}</p>
                    <p style={{whiteSpace: "nowrap"}}>{data.prise} ₽</p>
                </div>
            </div>
        </Link>
    )
}