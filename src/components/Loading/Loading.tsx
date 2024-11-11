import { useEffect, useState } from 'react';
import classes from './Loading.module.scss';

const Loading = () => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('Something went wrong, please try again later.');
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.container}>
      {errorMessage ? (
        <>
          <h2>Sorry ;(</h2>
          <p>{errorMessage}</p>
        </>
      ) : (
        <>
          <div className={classes.loader}></div>
          <h2>Wait for it</h2>
        </>
      )}
    </div>
  );
};

export default Loading;
