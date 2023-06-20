import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    background: {
        position: "fixed",
        background: "rgb(0,0,0,50%)",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        zIndex: 99,
    }
}))

export default function BackgroundModal() {
    const {classes} = useStyles()

    return (
        <div className={classes.background}>
        </div>
    )
}