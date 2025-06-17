import { Button, styled } from "@mui/material";
import { IconApp } from "../icon";
import { listaIcones } from "src/configs/listaIcones";

interface propsInputFile {
    handleFileChange: (arquivos: FileList) => void;
    multiple?: boolean;
    accept: TypeFileAccept[];
    label: string;
    width?: string;
    fontSize?: string;
}

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export type TypeFileAccept = "image/*" | ".pdf" | "application/json";

export function InputFile(props: propsInputFile) {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{
                width: props.width,
            }}
            startIcon={<IconApp icon={listaIcones.upload} />}
        >
            {props.label}
            <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                    const files = e.target.files;
                    if (!files) {
                        return;
                    }
                    props.handleFileChange(files);
                    e.target.value = "";
                }}
                multiple={props.multiple}
                accept={props.accept.join(" ")}
            />
        </Button>
    );
}
