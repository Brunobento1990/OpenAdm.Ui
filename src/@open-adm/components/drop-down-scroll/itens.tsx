import { forwardRef } from "react";

export const ItensDropDown = forwardRef((props: any, ref) => {
    const { children, onScroll } = props;

    return (
        <ul
            {...props}
            ref={ref}
            onScroll={onScroll}
            style={{ maxHeight: 200, overflow: 'auto' }}
        >
            {children}
        </ul>
    );
});