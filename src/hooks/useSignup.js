import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => { //takes all from Signup page
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      // up we have a method to add user mail and pass, but not user name !
      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`// creating folder for user with the photo name.
      const img = await projectStorage.ref(uploadPath).put(thumbnail) // ref - for path. put - for upload.
      const imgUrl = await img.ref.getDownloadURL() // get the url of the photo in the uploaded path

      // add display name to user [and photo]
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      // create a user document that match the user ID (and not auto generate with .add() )
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        email,
        photoURL: imgUrl
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}