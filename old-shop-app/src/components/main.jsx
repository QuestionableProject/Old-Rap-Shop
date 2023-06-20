import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    Main: {
        zIndex: 1,
        flex: 1,
        width: "100%",
        color: theme.white,
        height: "100%"
    }
}))

export default function Main({children}) {
    const {classes} = useStyles();

    return (
        <main className={classes.Main}>
            {children}
        </main>
    )
}