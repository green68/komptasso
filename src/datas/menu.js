import { BsCalendar, BsBank, BsPiggyBank, BsClipboardCheck } from "react-icons/bs";
import { BiHome } from 'react-icons/bi'
import { FaBalanceScale } from 'react-icons/fa'

const menus = [
    {
        name: "home",
        icon: <BiHome />,
        label: "Accueil"
    },
    {
        name: "bilan",
        icon: <FaBalanceScale />,
        label: "Bilan"
    },
    {
        name: "year",
        icon: <BsCalendar />,
        label: "..."
    },
    {
        name: "cash",
        icon: <BsPiggyBank />,
        label: "0,00"
    },
    {
        name: "bank",
        icon: <BsBank />,
        label: "0,00"
    },
]

const getNames = _ => {
    return menus.map( menu => menu.name)
}

const findName = name => menus.find(menu => menu.name === name)

export {
    // menus,
    getNames,
    findName,
}