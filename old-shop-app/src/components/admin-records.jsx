import { createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import ProductCardAdmin from './product-card-admin';

const useStyles = createStyles((theme) => ({
    records: {
        main: {
            display: "flex",
            gap: "100px",
            flexWrap: "wrap",
            padding: "50px"
        }
    }
}))

export default function AdminRecords({ open, onToggle }) {
    const { classes } = useStyles()

    const [product, setProduct] = useState()

    useEffect(() => {
        const onClick = (e) => {
            if (!e.target.getAttribute("data-records")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open])

    useEffect(() => {
        async function getRecord() {
            const records = await fetch(`http://localhost:5000/api/records`)

            const data = await records.json()
            setProduct(data)
            console.log(data);
        }
        getRecord()
    }, [])

    return (
        <section className={classes.records}>
            <header>
                <h1>Пластинки</h1>
                <ul>
                    <li>Изменить пластинки</li>
                    <li>Создать пластинку</li>
                </ul>
            </header>
            <main>
                {product?.map((e, i) =>
                    <ProductCardAdmin key={i} data={e} />
                )}
            </main>
        </section>
    )
}