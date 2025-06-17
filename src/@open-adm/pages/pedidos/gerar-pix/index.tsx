// import { Button, useMediaQuery, useTheme } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
// import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
// import { useApiPedido } from "src/@open-adm/api/UseApiPedido";
// import { BoxApp } from "src/@open-adm/components/box";
// //import { Form } from "src/@open-adm/components/form";
// import { InputCustom, MaskType } from "src/@open-adm/components/input";
// import { useSnackbar } from "src/@open-adm/components/snack";
// import { TextApp } from "src/@open-adm/components/text";
// import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
// import { useNewApi } from "src/@open-adm/hooks/use-new-api";
// import { IGerarPixResponse } from "src/@open-adm/types/gerar-pix-response";
// import { IPedido } from "src/@open-adm/types/pedido";
// import { cleanFormatMoney, formatMoney } from "src/@open-adm/utils/format-money";

export function GerarPixPedido() {
    // const { id } = useNavigateApp();
    // //const { getGerarPix } = useApiPedido();
    // const { show } = useSnackbar();
    // const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.up('sm'));
    // const [loading, setLoading] = useState(true)
    // const [pedido, setPedido] = useState<IPedido>();
    // const [pixResponse, setPixResponse] = useState<IGerarPixResponse>();
    // const apiGerarPix = useNewApi({
    //     method: 'POST',
    //     url: 'fatura/gerar-pix',
    //     naoRenderizarResposta: true
    // });
    // const form = useFormikAdapter({
    //     initialValues: {
    //         valor: ''
    //     },
    //     validationSchema: new YupAdapter().string('valor').build(),
    //     onSubmit: gerarPix
    // })

    // async function gerarPix() {
    //     if (!pedido) {
    //         return;
    //     }
    //     setLoading(true);
    //     const response = await apiGerarPix.fecth<IGerarPixResponse>({
    //         body: {
    //             pedidoId: pedido.id,
    //             valor: cleanFormatMoney(form.values.valor)
    //         }
    //     })
    //     setPixResponse(response)
    //     setLoading(false);
    // }

    // const copyToClipboard = async (valor: string, texto: string) => {
    //     try {
    //         await navigator.clipboard.writeText(valor);
    //         show(texto, 'success')
    //     } catch (err) {
    //         show('Não foi possível copiar', 'error')
    //     }
    // };

    // async function init() {
    //     const response = await getGerarPix(id);
    //     if (response) {
    //         setPedido(response);
    //         form.setValue({
    //             valor: response.totalAReceber
    //         })
    //     }
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     init();
    // }, [])

    return (
        <></>
        // <Form
        //     titleButton="Gerar pix"
        //     action="create"
        //     title={`Gerar pix para o pedido: ${pedido?.numero}`}
        //     loading={loading}
        //     submit={form.onSubmit}
        // >
        //     <TextApp texto={`Total do pedido: ${formatMoney(pedido?.valorTotal) ?? ''}`} />
        //     <InputCustom
        //         id="valor"
        //         label="Valor"
        //         name="valor"
        //         value={form.values.valor}
        //         autoFocus
        //         fullWidth
        //         error={form.error('valor')}
        //         helperText={form.helperText('valor')}
        //         onChange={form.onChange}
        //         onBlur={form.onBlur}
        //         mask={MaskType.MONEY}
        //     />
        //     {pixResponse && (
        //         <BoxApp
        //             display="flex"
        //             flexDirection="column"
        //             alignItems="center"
        //             justifyContent="center"
        //             gap="1rem"
        //         >
        //             <img
        //                 alt="pix qr code"
        //                 src={`data:image/jpeg;base64,${pixResponse.qrCodePixBase64}`}
        //                 style={{
        //                     width: !matches ? `calc(100vw  - 200px)` : '300px'
        //                 }}
        //             />
        //             <Button
        //                 onClick={() => copyToClipboard(pixResponse.qrCodePix, 'Pix copiado com sucesso')}
        //                 variant="contained"
        //             >
        //                 Pix copia e cola
        //             </Button>
        //             <Button
        //                 variant="contained"
        //                 onClick={() => copyToClipboard(pixResponse.linkPagamento, 'Link de pagamento copiado com sucesso')}
        //             >
        //                 Copiar link de pagamento
        //             </Button>
        //         </BoxApp>
        //     )}
        // </Form>
    )
}