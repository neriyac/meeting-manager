// import { useRef } from 'react';
import emailjs from 'emailjs-com';
import { useState } from 'react';




export const useForm = () => {

  // const form = useRef();
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [meetingDetails, setMeetingDetails] = useState('')

  const sendEmail = (uname, uemail, umeetingDetails) => {

    const form = () => {
      setUserName(uname)
      setUserEmail(uemail)
      setMeetingDetails(umeetingDetails)
    }

    emailjs.sendForm('service_meeting', 'template_meeting', form.current, 'h2ybNVJ6sfjLmCZ96')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      form.current.reset()
  };


  return { sendEmail, userName, userEmail, meetingDetails }
};