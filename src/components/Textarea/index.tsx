import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

const Textarea: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const textAreaReference = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [focus, setFocus] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleInputBlur = useCallback(() => {
    setFocus(false);
    // o perador !! é pra ver se existe algum valor na variável
    setHasValue(!!textAreaReference.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setFocus(true);
  }, []);

  /**
   *  O defaultValue é uma prop passada la no Form chamada initialValue
   * pode ser passada assim:
   * initialData={{ name: 'Thiago' }}
   */

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaReference.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      hasError={!!error}
      isFocused={focus}
      hasValue={hasValue}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <textarea
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        ref={textAreaReference}
        value={error && error}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Textarea;
