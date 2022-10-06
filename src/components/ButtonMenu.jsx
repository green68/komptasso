import './ButtonMenu.css'
import { findName } from "./../datas/menu";

function ButtonMenu({name, page, menuClick}) {

    let classname = "menu"
    let menu = findName(name)
    if (page === name) {
        classname += " active"
    }

    return  (
        <div
            key={name}
            className={classname}
            onClick={e => menuClick(name)} >
                {/* <div>{menu.icon}</div>
                <div>{menu.label}</div> */}
                {menu.icon}
                {menu.label}
        </div>)
    

}

export { ButtonMenu as default}