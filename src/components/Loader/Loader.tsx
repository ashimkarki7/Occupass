import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  minHeight?: string;
  size?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ minHeight = '200px', size = '2.5rem', color = '#FF8000' }) => {
  return (
    <div className={styles.loader} style={{ minHeight }}>
      <div
        className={styles.spinner}
        style={{ width: size, height: size, borderTopColor: color }}
      >
      </div>
    </div>
  );
};

export default Loader;