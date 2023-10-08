import { async } from '@firebase/util'
import {signOut, getAuth } from 'firebase/auth'

export function AdminDashboard(){
    const auth = getAuth()
    async function handleSignOut(){
        try{
            await signOut(auth);
            console.log('LOGED OUT');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <h1>DASHBOARD</h1>
            <button onClick={() => {handleSignOut()}}>Sign Out</button>
        </div>
    )
}