import React, { useState } from 'react';
import styles from './Newsletter.module.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleInput = e => setEmail(e.target.value);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(`/functions/addToNewsletterList?email=${email}`);
      const body = await response.json();
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    return false;
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <p className={styles.title}>Newsletter</p>
      {
        isSuccessful ? (
          <>
            <div className={styles.input}>Thank you!</div>
            <div className={styles.submit}>
              <img alt="success" className={styles.check} src="/img/icons/check.svg" />
            </div>
          </>
        ) : (
          <>
            <input className={styles.input} onChange={handleInput} placeholder="enter your email address" value={email} type="text" />
            <input alt="submit" className={styles.submit} src="/img/icons/arrow.svg" type="image" />
            {error && <p className={styles.error}>Failed to submit. Please check email and try again.</p>}
          </>
        )
      }
    </form>
  );
};

export default Newsletter;
