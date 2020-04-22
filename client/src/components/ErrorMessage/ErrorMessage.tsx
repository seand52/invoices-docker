import React, { ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

interface Props {
  children: ReactNode;
}
export default function ErrorMessage({ children }) {
  return <p className={styles.message}>{children}</p>;
}
