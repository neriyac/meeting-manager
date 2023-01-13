// import { useRef } from 'react';
// import emailjs from 'emailjs-com';

// export function useForm( { userName, userEmail, message } ) {

//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_meeting', 'template_meeting', form.current, 'h2ybNVJ6sfjLmCZ96')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//       form.current.reset()
//   };

// //   const name = "user_name"
// //   const email = "user_email"
// //   const message = "message"


//   return (
//     <form ref={form} onSubmit={sendEmail}>
//       <label>Name</label>
//       <input type="text" name={userName} />
//       <label>Email</label>
//       <input type="email" name={userEmail} />
//       <label>Message</label>
//       <textarea name={message} />
//       <input type="submit" value="Send" />
//     </form>
//   );
// };