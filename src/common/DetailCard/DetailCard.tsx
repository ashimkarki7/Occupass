import React from 'react';

interface DetailCardProps {
  styles:any;
  title: string;
  fields: { label: string; value?: string | number }[];
}

const DetailCard: React.FC<DetailCardProps> = ({styles, title, fields }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {fields.map((field, idx) => (
          <div key={idx} className={styles.row}>
            <span className={styles.label}>{field.label?.toUpperCase()}:</span>
            <span className={styles.value}>{field.value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCard;