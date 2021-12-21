import { ChangeEvent, FC, useState } from 'react';

interface Props {
  type?: 'text' | 'password';
  placeholder?: string;
  style?: React.CSSProperties;
  onChange?: (value?: string) => void;
}

const Index: FC<Props> = ({ type, placeholder, style = {}, onChange }) => {
  const [isFocus, setIsFocus] = useState<boolean>();
  const onInnerChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e?.target?.value);
  };

  const {
    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    ...restStyle
  } = style;
  return (
    <div
      style={{
        position: 'relative',
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      }}
    >
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onInnerChange}
        style={{
          width: '350px',
          position: 'relative',
          outline: 'none',
          border: 'none',
          background: 'transparent',
          borderBottom: '1px solid #a9aaaa',
          padding: '5px 0px',
          fontSize: '16px',
          ...restStyle,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '0',
          bottom: '0',
          height: '2px',
          backgroundColor: '#118DF0',
          transition: '.5s',
          width: isFocus ? '100%' : '0',
        }}
      />
    </div>
  );
};

export default Index;
