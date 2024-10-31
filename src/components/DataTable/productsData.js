import { avatarman, edit2, preview, trash } from "../icons/icon"

export const columns = [
    {
        name: 'No',
        sortable: true,
        maxwidth: '45px',
        selector: row => row.no
    },
    {
        name: 'Order ID',
        sortable: true,
        minwidth: '100px',
        selector: row => row.order_id
    },
    {
        name: 'ProductInfo',
        sortable: true,
        minwidth: '200px',
        cell: (row) => {
            return (
                <div className="flex items-center w-full gap-1">
                    <img src={avatarman} className="h-[24px] w-auto rounded-full" alt="" />
                    <div className="w-full line-clamp-1">
                        {row.personal_infor}
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Order Quantity',
        sortable: true,
        minwidth: '120px',
        selector: row => row.order_quantity
    },
    {
        name: 'Total',
        sortable: true,
        minwidth: '140px',
        selector: row => row.total
    },
    {
        name: 'Address',
        sortable: true,
        minwidth: '220px',
        selector: row => row.address
    },
    {
        name: 'Status',
        sortable: true,
        minwidth: '120px',
        cell: (row) => {
            return (
                <div className="border border-white bg-[#ecf8f0] text-[#1C8C6E] rounded text-center py-[6px] w-[100px] h-auto">
                    {row.status}
                </div>
            )
        }
    },
    {
        name: 'Action',
        allowoverflow: true,
        minwidth: '112px',
        cell: () => {
            return (
                <div className='flex gap-1'>
                    <button className="bg-[#2B7F75] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><img className="w-[12px] h-auto" src={preview} alt="" /></button>
                    <button className="bg-[#54A6FF] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><img className="w-[12px] h-auto" src={edit2} alt="" /></button>
                    <button className="bg-[#CE2C60] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><img className="w-[12px] h-auto" src={trash} alt="" /></button>
                </div>
            )
        }
    }
]

export const dataTable = [
    { no: "01", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "02", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "03", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "04", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "05", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'Pending', action: '' },
    { no: "06", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "07", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'Progress', action: '' },
    { no: "08", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "09", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "10", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "11", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "12", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "13", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "14", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "15", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
    { no: "16", order_id: '#FUP1', personal_infor: "Blue Denim Shirt", order_quantity: "13", total: '$345', address: 'New York Chloe 2092', status: 'New', action: '' },
]
