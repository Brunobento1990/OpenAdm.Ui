import { BoxApp } from 'src/@open-adm/components/box';
import { CardCustom } from 'src/@open-adm/components/cards';
import { IconApp } from 'src/@open-adm/components/icon';
import { IconButtonAppComTooltip } from 'src/@open-adm/components/icon/icon-button-app-tool-tip';
import { TextApp } from 'src/@open-adm/components/text';
import { listaIcones } from 'src/configs/listaIcones';

interface propsTotalUsuarios {
    total: number;
    titulo: string;
    cor: string;
    navigate: () => void;
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
                <BoxApp display='flex' alignItems='center' gap='1rem'>
                    <TextApp fontSize='1.2rem' fontWeight={600} texto={`${props.total}`} />
                    <IconButtonAppComTooltip onClick={props.navigate} icon={listaIcones.redirect} titulo='Visualizar ultimos pedidos' />
                </BoxApp>
            </BoxApp>
        </CardCustom>
    )
};

export default TotalUsuarios;