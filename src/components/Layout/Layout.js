import '../../styles/reset.css';
import '../../styles/vars.css';
import '../../styles/global.css';
import React from 'react';
import styles from './Layout.module.scss';
import Navigation from '../Navigation/Navigation';

const backgroundTransitionColors = ['#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

export default ({ children }) => (
  <>
    <Navigation />
    <div className={styles.container}>{children}</div>
    <Navigation />
    <div
      className={styles.backgroundTransition}
      style={{
        backgroundColor:
          backgroundTransitionColors[
            Math.floor(Math.random() * backgroundTransitionColors.length)
          ],
      }}
    />
  </>
);