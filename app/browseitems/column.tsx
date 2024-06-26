export type Item = {
    ITMID: string
    ITEMDS: string
    ITMCLSCD: string
    PRMSUPID: string
    PCKDS: string
}

export const columns = [
    {
        key: 'ITMID',
        label: 'ITEM NO.'
    },
    {
        key: 'ITEMDS',
        label: 'DESCRIPTION'
    }
]