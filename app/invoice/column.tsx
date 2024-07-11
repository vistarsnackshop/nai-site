export type Invoice = {
    AACMSPID: string
    SPNMDS: string
    HSBLID: string
    HSIVCDT: string
    '00005': string
}

export type InvoiceLine = {
    BLLINNB: string
    '00002': string
    '00003': string
    ITMID: string
    BLORIMDS: string
    '00006': string
    '00007': string
    '00008': string
}

export const columns = [
    {
        key: 'AACMSPID',
        label: 'Ship To'
    },
    {
        key: 'SPNMDS',
        label: 'Description'
    },
    {
        key: 'HSBLID',
        label: 'Invoice'
    },
    {
        key: 'HSIVCDT',
        label: 'Date'
    },
    {
        key: '00005',
        label: 'Cost'
    },
    {
        key: 'BLLINNB',
        label: 'Line Number'
    },
    {
        key: '00002',
        label: 'Quantity Ordered'
    },
    {
        key: '00003',
        label: 'Quantity Shipped'
    },
    {
        key: 'ITMID',
        label: 'Item No.'
    },
    {
        key: 'BLORIMDS',
        label: 'Item Description'
    },
    {
        key: '00006',
        label: 'Item Price'
    },
    {
        key: '00007',
        label: 'Total Item Price'
    },
    {
        key: '00008',
        label: 'Tx'
    }
]