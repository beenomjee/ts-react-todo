import React, {FC} from 'react';
import { Header, Tasks } from '../../components';
import styles from './Home.module.css'

type Props = {}

const Home:FC<Props> = () => {
  return (
    <div className={styles.home}>
      <Header/>
      <Tasks />
    </div>
  )
}

export default Home;