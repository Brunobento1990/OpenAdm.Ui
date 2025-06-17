export const statusPedido: any = {
    0: { title: "Em aberto", color: "warning" }, //
    1: { title: "Faturado", color: "primary" }, //success
    2: { title: "Em entrega", color: "info" },
    3: { title: "Entregue", color: "success" }, //warning
    4: { title: "Cancelado", color: "error" }, //warning
};

export type StatusPedidoEnum = 0 | 1 | 2 | 3 | 4;

export const opcoesStatusPedido = [
    {
        label: "Em aberto",
        id: 0,
    },
    {
        label: "Faturado",
        id: 1,
    },
    {
        label: "Em entrega",
        id: 2,
    },
    {
        label: "Entregue",
        id: 3,
    },
    {
        label: "Cancelado",
        id: 4,
    },
];
