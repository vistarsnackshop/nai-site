export type Item = {
    ITMID: string
    ITEMDS: string
    BDCUITAM: string
}

export const columns = [
    {
        key: 'ITMID',
        label: 'ITEM NO.'
    },
    {
        key: 'ITEMDS',
        label: 'DESCRIPTION'
    },
    {
        key: 'BDCUITAM',
        label: "BID PRICE"
    }
]