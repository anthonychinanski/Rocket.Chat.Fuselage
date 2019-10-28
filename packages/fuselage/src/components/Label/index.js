import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';

import { createStyledComponent } from '../../styles';
import { Text } from '../Text';
import styles from './styles';

const LabelContext = createContext(false);

const Container = createStyledComponent(styles, 'rcx-label', 'label');
const Wrapper = createStyledComponent(styles, 'rcx-label__wrapper', 'span');
const TextContainer = createStyledComponent(styles, 'rcx-label__text', Text);

export const Label = React.forwardRef(function Label({
  children,
  disabled,
  is,
  position,
  required,
  text,
  ...props
}, ref) {
  const isInsideLabel = useContext(LabelContext);
  const component = is || (isInsideLabel && 'span') || 'label';

  return <LabelContext.Provider value={true}>
    <Container as={component} modifiers={{ position }} ref={ref} {...props}>
      {text && <Wrapper modifiers={{ hasChildren: !!children, position }}>
        <TextContainer disabledLabelColor={disabled} modifiers={{ required }}>{text}</TextContainer>
      </Wrapper>}

      {children}
    </Container>
  </LabelContext.Provider>;
});

Label.defaultProps = {
  position: 'start',
};

Label.displayName = 'Label';

Label.propTypes = {
  disabled: PropTypes.bool,
  /** Is this component visible? */
  invisible: PropTypes.bool,
  is: PropTypes.elementType,
  position: PropTypes.oneOf(['top', 'start', 'end']),
  required: PropTypes.bool,
  text: PropTypes.string,
};

Label.styled = Container;