import { BoxApp } from 'src/@open-adm/components/box';
import { CardCustom } from 'src/@open-adm/components/cards';
import { IconApp } from 'src/@open-adm/components/icon';
import { TextApp } from 'src/@open-adm/components/text';

interface propsTotalUsuarios {
    total: number;
    titulo: string;
    cor: string
}

const TotalUsuarios = (props: propsTotalUsuarios) => {
    return (
        <CardCustom>
            <BoxApp padding='1rem'>
                <BoxApp display='flex' justifyContent='space-between'>
                    <TextApp fontWeight={600} texto={props.titulo} />
                    <BoxApp padding='0.5rem' display='flex' alignItems='center' justifyContent='center' borderRadius='50%' border={`0.5px solid ${props.cor}`}>
                        <IconApp icon='icon-park-outline:avatar' color={props.cor} />
                    </BoxApp>
                </BoxApp>
                <TextApp fontSize='1.2rem' fontWeight={600} texto={`${props.total}`} />
            </BoxApp>
        </CardCustom>
    )
};

export default TotalUsuarios;