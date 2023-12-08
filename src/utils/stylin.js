import {
  styled as muiStyled,
  shouldForwardProp as muiShouldForwardProps
} from '@mui/system'

const FILTER_PROPS = []

const createShouldForwardProp =
  (styledProps = []) =>
    prop =>
      muiShouldForwardProps(prop) &&
      ![...styledProps, ...FILTER_PROPS].includes(prop)

/**
 * Use this just as you would `styled` from mui or emotion when using object
 * styles. It is not set up for template literals.
 *
 * This abstraction is meant to make future refactors or updates to the method
 * of styled components simpler. It makes the implementation consistent as well.
 * You get all the features of sx style props free when using it.
 */
const stylin = (el, styleProps, options) => styles =>
  typeof styles === 'function'
    ? muiStyled(el, {
      ...options,
      shouldForwardProp: createShouldForwardProp(styleProps)
    })(({ theme, ...props }) => theme.unstable_sx(styles({ ...props, theme })))
    : muiStyled(el, {
      ...options,
      shouldForwardProp: createShouldForwardProp(styleProps)
    })(({ theme }) => theme.unstable_sx(styles))

export default stylin
