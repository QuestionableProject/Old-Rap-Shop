import { createStyles } from '@mantine/core';
import UserCard from './user-card';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

const useStyles = createStyles((theme) => ({

}))

export default function AdminUsers({ open, onToggle }) {
    const { classes } = useStyles()

    const {id} = useAuth()

    const [users, setUsers] = useState(null)

    useEffect(() => {
        const onClick = (e) => {
            if (!e.target.getAttribute("data-users")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open])

    useEffect(() => {
        async function getOrders() {
            const response = await fetch(`http://localhost:5000/api/admin/getusers`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: id
                })
            })

            const data = await response.json()

            setUsers(data)
        }
        getOrders()
    }, [])


    return (
        <section className={classes.users}>
            <header>
                <h1>Пользователи</h1>
            </header>
            <main>
                {users?.map((e, i)=> 
                    <UserCard data={e} key={i}/>
                )}
            </main>
        </section>
    )
}