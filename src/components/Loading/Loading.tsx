import classes from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
      <h2>Wait for it</h2>
    </div>
  );
};

export default Loading;
