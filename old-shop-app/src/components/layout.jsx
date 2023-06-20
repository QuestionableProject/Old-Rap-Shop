import { createStyles, keyframes } from '@mantine/core';

export const bounce = keyframes({
    '0%': { transform: 'rotate(0)' },
    '100%': { transform: 'rotate(360deg)' },
});

const useStyles = createStyles((theme) => ({
    Layout: {
        background: theme.fn.gradient({ from: theme.colors.dark[9], to: "#422121", deg: 317 }),
        width: "100%", height: "100vh",
        padding: "50px 50px 0 50px",
        '@media (max-width: 1000px)': {
            padding: "50px 30px 0 30px",
        },
        '@media (max-width: 500px)': {
            padding: "50px 10px 0 10px",
        }
    },

    circle: {
        position: "absolute",
        zIndex: 0,
        width: "1100px",
        height: "1100px",
        bottom: "0", left: "0",
        transform: "translatX(-50%)",
        border: "2px solid white",
        borderRadius: "50%",
        opacity: ".1",
        animation: `${bounce} 10s linear infinite`,
        '@media  (max-width: 1400px)': {
            top: "-100px", left: "-100px",
            width: "300px",
            height: '300px',
            transform: "translatY(-50%)",
        },
    },
    circle__block: {
        position: "relative",
        width: "100%",
        height: "100%"
    },
    unix: {
        position: "absolute",
        width: "50px",
        height: "50px",
        background: theme.white,
        borderRadius: "50%",
        '@media (max-width: 400px)': {
            width: "20px", height: "20px"
        },
        '@media (max-width: 900px)': {
            width: "30px", height: "30px"
        }
    },
    app: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        justifyContent: "space-between",
        zIndex: 1,
        height: "100%",
    }
}))

export default function Layout({ children }) {
    const { classes } = useStyles();

    return (
        <div className={classes.Layout}>
            <div className={classes.circle}>
                <div className={classes.circle__block}>
                    <div className={classes.unix} style={{ transform: "translate(-50%, -50%)", top: 0, left: "50%" }}></div>
                    <div className={classes.unix} style={{ transform: "translate(50%, 50%)", top: "50%", right: 0 }}></div>
                    <div className={classes.unix} style={{ transform: "translate(-50%, 50%)", bottom: 0, left: "50%" }}></div>
                    <div className={classes.unix} style={{ transform: "translate(-50%, 50%)", top: "50%", left: 0 }}></div>
                </div>
            </div>
            <div className={classes.app}>
                {children}
            </div>
        </div>
    )
}