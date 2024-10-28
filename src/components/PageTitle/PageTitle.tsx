import React, { FC } from 'react'
import classes from './PageTitle.module.scss'
interface PageTitleProps {
    title: string;
    subtitle: string;
}

const PageTitle: FC<PageTitleProps>= ({title, subtitle}) => {
  return (
    <div className={classes.container}>
        <h1 className={classes.title}>
            {title}
        </h1>
        <h2 className={classes.subtitle}>
            {subtitle}
        </h2>
    </div>
  )
}

export default PageTitle