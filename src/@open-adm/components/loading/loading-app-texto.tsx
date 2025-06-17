import { LoadingApp } from ".";
import { BoxApp } from "../box";
import { TextApp } from "../text";


interface propsLoadingAppTexto {
    texto?: string;
    size?: number;
    marginBottom?: string;
    comBox?: boolean;
    marginTop?: string;
    height?: string;
}

export function LoadingAppTexto(props: propsLoadingAppTexto) {
    if (props.comBox) {
        return (
            <BoxApp
                width='100%'
                display='flex'
                alignItems='center'
                marginBottom={props.marginBottom}
                marginTop={props.marginTop ?? '1rem'}
                justifyContent='center'
                gap='1rem'
                height={props.height}
            >
                <TextApp texto={props.texto ?? 'Carregando...'} />

                <LoadingApp size={props.size ?? 20} />
            </BoxApp>
        );
    }

    return (
        <BoxApp
            display='flex'
            gap='1rem'
            marginBottom={props.marginBottom}
        >
            <TextApp texto={props.texto ?? 'Carregando...'} />
            <LoadingApp size={props.size ?? 20} />
        </BoxApp>
    );
}