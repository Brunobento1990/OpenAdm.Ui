import { Box } from "@mui/material";
import { ReactNode } from "react";

export type justifyContent =
  | "start"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "end";

export type alignItems = "stretch" | "center" | "start" | "end";
export type flexDirection = "column" | "column-reverse" | "row" | "row-reverse";

export type overflowY = "visible" | "hidden" | "clip" | "scroll" | "auto";
export type flexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type textAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";

export type visibility = "visible" | "hidden" | "collapse";

export interface propsBoxApp {
  visibility?: visibility;
  margin?: string;
  flex?: number;
  onMouseDown?: (e: any) => any;
  onMouseUp?: (e: any) => any;
  resize?: "none " | "both" | "horizontal" | "vertical" | "block" | "inline";
  className?: string;
  width?: string;
  borderLeft?: string;
  height?: string;
  alignItems?: alignItems;
  justifyContent?: justifyContent;
  children: ReactNode;
  flexDirection?: flexDirection;
  borderRadius?: string;
  boxShadow?: string;
  gap?: string;
  display?: string;
  backgroundColor?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  border?: string;
  padding?: string;
  animation?: string;
  ref?: any;
  marginTop?: string;
  borderBottom?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  overflowy?: overflowY;
  overflowx?: overflowY;
  color?: string;
  transition?: string;
  id?: string;
  flexGrow?: number;
  component?: string;
  position?: string;
  boxSizing?: string;
  borderRight?: string;
  gridTemplateAreas?: string;
  gridTemplateColumns?: string;
  gridAutoRows?: string;
  gridArea?: string;
  hover?: any;
  after?: any;
  bottom?: string;
  left?: string;
  opacity?: string;
  zIndex?: string;
  right?: string;
  borderTop?: string;
  top?: string;
  cursor?: string;
  transform?: string;
  transition_delay?: string;
  transition_duration?: string;
  textAlign?: textAlign;
  borderColor?: string;
  paddingRight?: string;
  paddingLeft?: string;
  sx?: any;
  flexWrap?: flexWrap;
  onClick?: (e: any) => void;
  background?: string;
  active?: any;
  before?: any;
}

export function BoxApp(props: propsBoxApp) {
  return (
    <Box
      {...props}
      className={props.className}
      maxWidth={props.maxWidth}
      height={props.height}
      width={props.width}
      display={props.display}
      alignItems={props.alignItems}
      justifyContent={props.justifyContent}
      gap={props.gap}
      flex={props.flex}
      flexDirection={props.flexDirection}
      flexWrap={props.flexWrap}
      onClick={props.onClick}
      sx={{
        ...props.sx,
        visibility: props.visibility,
        resize: props.resize as any,
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop,
        animation: props.animation,
        overflowY: props.overflowy,
        transition: props.transition,
        overflowX: props.overflowx,
        "&:hover": props.hover,
        "&::after": props.after,
        "&::before": props.before,
        "&:active": props.active,
        bottom: props.bottom,
        left: props.left,
        opacity: props.opacity,
        zIndex: props.zIndex,
        right: props.right,
        marginRight: props.marginRight,
        borderTop: props.borderTop,
        top: props.top,
        cursor: props.cursor,
        transform: props.transform,
        transitionDelay: props.transition_delay,
        transitionDuration: props.transition_duration,
        textAlign: props.textAlign,
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight,
        borderLeft: props.borderLeft,
        margin: props.margin,
        background: props.background,
      }}
      borderColor={props.borderColor}
      boxShadow={props.boxShadow}
      maxHeight={props.maxHeight}
      border={props.border}
      borderRadius={props.borderRadius}
      padding={props.padding}
      minHeight={props.minHeight}
      minWidth={props.minWidth}
      borderBottom={props.borderBottom}
      marginLeft={props.marginLeft}
      color={props.color}
      flexGrow={props.flexGrow}
      component={props.component as any}
      position={props.position as any}
      boxSizing={props.boxSizing as any}
      borderRight={props.borderRight}
      gridTemplateAreas={props.gridTemplateAreas}
      gridTemplateColumns={props.gridTemplateColumns}
      gridAutoRows={props.gridAutoRows}
      gridArea={props.gridArea}
    >
      {props.children}
    </Box>
  );
}
