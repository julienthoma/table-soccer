import styled from '@emotion/styled';
import {
  space,
  color,
  fontSize,
  width,
  height,
  fontWeight,
  lineHeight,
  fontStyle,
  textAlign,
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order
} from 'styled-system';

const Box = styled('div')`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`;

Box.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes
};

const Flex = styled(Box)`
  display: flex;
  ${width}
  ${height}
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flexDirection}
  ${flex}
  ${justifySelf}
  ${alignSelf}
  ${order}
`;

Flex.propTypes = {
  ...width.propTypes,
  ...height.propTypes,
  ...alignItems.propTypes,
  ...alignContent.propTypes,
  ...justifyContent.propTypes,
  ...flexWrap.propTypes,
  ...flexBasis.propTypes,
  ...flexDirection.propTypes,
  ...flex.propTypes,
  ...justifySelf.propTypes,
  ...alignSelf.propTypes,
  ...order.propTypes
};

const Text = styled('div')`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${fontStyle}
  ${textAlign}
  ${color}
`;

Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes
};

const Heading = Text.withComponent('h1');

Heading.defaultProps = {
  fontSize: 5,
  lineHeight: 1.5,
  m: 0
};

export { Box, Text, Heading, Flex };
