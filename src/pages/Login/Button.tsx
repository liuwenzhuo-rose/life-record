import { FC } from 'react';

interface Props {
  text?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

const Index: FC<Props> = ({ text, style, onClick, disabled }) => {
  return (
    <div
      onClick={disabled ? () => {} : onClick}
      style={{
        width: '350px',
        background: disabled ? 'grey' : '#118DF0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        padding: '5px 0',
        cursor: 'pointer',
        marginBottom: '10px',
        borderRadius: '16px',
        color: 'white',
        userSelect: 'none',
        ...style,
      }}
    >
      {text ?? '按钮'}
    </div>
  );
};

export default Index;
