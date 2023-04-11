import React, { FC } from 'react'
import styles from './Header.module.css';

const Header:FC = () => {
  return (
    <header className={styles.header}>
        <h3>Website Todo</h3>
    </header>
  )
}

export default Header