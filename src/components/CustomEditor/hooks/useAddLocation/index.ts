import {useEffect} from "react";

export default function useAddLocation(){
    useEffect(()=>{
        function handleMsg(e:any) {
            console.log(e)
        }

        window.addEventListener('message',handleMsg)

        return () => window.removeEventListener('message', handleMsg)
    },[])
}
