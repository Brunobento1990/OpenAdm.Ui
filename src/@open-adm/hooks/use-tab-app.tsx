import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export interface propsTabApp {
    tabs: propsTab[];
    marginTop?: string;
}

export interface propsTab {
    titulo: string;
    iconPosition?: "end" | "start" | "bottom" | "top";
}

interface propsUseTab {
    initialTab: number;
    onChange?: (numero: number) => Promise<any>;
}

export function useTabApp(props?: propsUseTab) {
    const [value, setValue] = useState(props?.initialTab ?? 0);
    const handleChange = async (newValue: number) => {
        setValue(newValue);
        if (props?.onChange) {
            await props.onChange(newValue);
        }
    };

    function Component(props: propsTabApp) {
        return (
            <Tabs
                value={value}
                onChange={(_, value) => handleChange(value)}
                sx={{
                    marginTop: props.marginTop,
                }}
            >
                {props.tabs.map((tab, index: number) => (
                    <Tab key={index} label={tab.titulo} iconPosition={tab.iconPosition} />
                ))}
            </Tabs>
        );
    }

    return {
        Component,
        value,
        setValue: handleChange,
    };
}
