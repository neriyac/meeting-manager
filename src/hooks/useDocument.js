import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"



export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document

    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError('No such project exist')
            }
        }, (error) => {
            console.log(error.message);
            setError('Failed to get document')
        })

        return () => unsubscribe() // its for unsub from this realtime data when we leave the page

    }, [collection, id])

    return { document, error }
}