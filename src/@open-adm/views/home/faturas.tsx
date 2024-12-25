import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BoxApp } from 'src/@open-adm/components/box';
import { TextApp } from 'src/@open-adm/components/text';
import { formatMoney } from 'src/@open-adm/utils/format-money';

interface propsFaturasDashBoard {
    faturas: any[];
}

const FaturasDashBoard = (props: propsFaturasDashBoard) => {
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <>
                    <BoxApp width='100%' display='flex' alignItems='center' justifyContent='center'>
                        <TextApp texto={`Faturas recebidas nos ultimos ${props.faturas.length} meses`} />
                    </BoxApp>
                    <AreaChart
                        width={500}
                        height={400}
                        data={props.faturas}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis dataKey={"count"} />
                        <Tooltip formatter={(value) => formatMoney(value as any)} label={'Valor'} />
                        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                </>
            </ResponsiveContainer>
        </>
    )
};

export default FaturasDashBoard;