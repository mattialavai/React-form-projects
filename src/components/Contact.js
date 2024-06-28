import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css'; // Importing the CSS file


const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState(null);

  const sendEmail = (e) => {
      e.preventDefault();

      emailjs
          .sendForm('service_1mrpnkg', 'template_9pvr74h', form.current, 'IvKVBI798mNqlz8aK')
          .then(
              () => {
                  setMessage('Message sent successfully!');
                  form.current.reset();
                  setTimeout(() => {
                      setMessage(null);
                  }, 5000); // Clear message after 5 seconds
              },
              (error) => {
                  setMessage('Failed to send message. Please try again later.');
                  console.error('Error:', error);
              }
          );
  };

// Function to handle input and allow only numbers, plus signs, exclamation marks, spaces, and slashes
const handlePhoneInput = (e) => {
  const value = e.target.value;
  e.target.value = value.replace(/[^0-9+! /]/g, '');
};

    return (
      <section className='container'>
        <div>
      <h2 className='--text-center'>Contact Us</h2>
      {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`} onClick={() => setMessage(null)}>
              {message}
          </div>
      )}
                <form ref={form} onSubmit={sendEmail} className='form-container'> 
    <label className="--form-field">
        <span>Full Name:</span>
        <input type='text' placeholder='Enter your full name' name='user_name' required/>
    </label>
    <label className="--form-field">
        <span>Email:</span>
        <input type='email' placeholder='Enter your email' name='user_email' required/>
    </label>
    <label className="--form-field">
        <span>Phone Number:</span>
        <input type='tel' placeholder='Enter your phone number' name='user_phone' required pattern="[0-9+! /]*" onInput={handlePhoneInput} />
    </label>
    <label className="--form-field">
        <span>Subject:</span>
        <input type='text' placeholder='Enter subject' name='subject' required/>
    </label>
    <label className="--form-field">
        <span>Message:</span>
        <textarea name='message' placeholder='Enter your message' required className="--large-textarea"></textarea>
    </label>
    <div className="--center-button">
        <button type='submit' className='--btn --btn-primary'>Send Message</button>
    </div>

</form>


         </div> 
        </section>
    )
}

export default Contact