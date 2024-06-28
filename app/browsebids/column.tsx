export type Bid = {
    WHSID: string
    WHSNMDS: string
    BDID: string
    BDDESC: string
}

export const columns = [
    {
        key: 'WHSID',
        label: 'OPERATING CO. ID'
    },
    {
        key: 'WHSNMDS',
        label: 'OPERATING CO.'
    },
    {
        key: 'BDID',
        label: 'BID'
    },
    {
        key: 'BDDESC',
        label: 'BID DESCRIPTION'
    }
]