import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BsBank } from "react-icons/bs";
import {
  FaBalanceScale,
  FaCalendar,
  FaHome,
  FaPiggyBank,
  FaTools
} from "react-icons/fa";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { User } from "./classes/User";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserInit from "./components/UserInit";
import { DatasClass } from "./datas/datas";
import BalancePage from "./pages/BalancePage";
import BankPage from "./pages/BankPage";
import CashPage from "./pages/CashPage";
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import YearPage from "./pages/YearPage";
import { pathTo } from "./utilities/Functions";
import { Menu } from "./utilities/Constantes";

/* eslint-disable */
import { BankItem } from "./classes/BankItem";
import { CashItem } from "./classes/CashItem";
import { jsonDatas } from "./datas/datas.json";
/* eslint-enable */

// console.clear()

// TEST: 
// datas.setUserFromJSON(jsonDatas)

// TODO: a associer à un bouton pour sauvegarde
// datas.saveToFile('kravmaga.json')

// TODO: if already save no rewrite, just saved initially ???
if (DatasClass.isLocale()) {
  DatasClass.getUserFromLocale()
} else {
  DatasClass.saveToLocale()
}

export default function App() {

  let navigate = useNavigate();

  // eslint-disable-next-line
  const [menu, setMenu] = useState(Menu.Home);
  const [user, setUser] = useState(DatasClass.getUser())
  const [year, setYear] = useState(user.name ? user.years?.getLast() : null);

  const changePage = (e) => {
    e.preventDefault();

    const newMenu = e.currentTarget?.dataset?.menu;
    console.log(`newMenu : ${newMenu}`);

    if (newMenu) {
      setMenu(newMenu);
      navigate(pathTo(newMenu));
    }
  };

  /**
   * 
   * @param {CashItem[]} datas 
   */
  function handleChangeCash(datas) {
    const newUser = new User( (JSON.stringify(user)))
    newUser.getYears().getYear(year.id).setCashItems(datas)
    userUpdate(newUser)
  }

  /**
   * 
   * @param {BankItem[]} datas 
   */
  function handleChangeBank(datas) {
    const newUser = new User( (JSON.stringify(user)))
    newUser.getYears().getYear(year.id).setBankItems(datas)
    userUpdate(newUser)
  }
  
  /**
   * 
   * @param {User} newUser 
   */
  const userUpdate = (newUser) => {
    if (newUser instanceof User) {
      setUser(newUser)
    } else {
      console.log("App : userUpdate => newUser not User ?");
      setUser(new User(newUser))
    }
  }
  
  // for resize page 
  useEffect(() => {
    function handleResize() {
      const main = document.querySelector('.main')
      const winHeight = `${window.innerHeight}px`
      const mainHeight = window.getComputedStyle(main).getPropertyValue("height")
      if (winHeight !== mainHeight) {
        main.style.height = winHeight
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)

    }
  })

  // update year and saveToLocale after user change
  useEffect(() => {
    setYear(user.name ? user.years?.getLast() : null)
    DatasClass.saveToLocale(user)
  }, [user])

  return (
    <div className="main">
      <Header>
        <NavLink
          to={pathTo(Menu.Home)}
          className="btn btn-dark btn-menu"
          data-menu={Menu.Home}
          onClick={(e) => changePage(e)}
        >
          <FaHome />
          Accueil
        </NavLink>
        <NavLink
          to={pathTo(Menu.Balance)}
          className="btn btn-dark btn-menu"
          data-menu={Menu.Balance}
          onClick={(e) => changePage(e)}
        >
          <FaBalanceScale />
          Balance
        </NavLink>
        <NavLink
          to={pathTo(Menu.Tools)}
          className="btn btn-dark btn-menu"
          data-menu={Menu.Tools}
          onClick={(e) => changePage(e)}
        >
          <FaTools />
          Outils
        </NavLink>
      </Header>
      <main>
        <Routes>
          <Route path={pathTo(Menu.Home)} element={<HomePage />} />
          <Route path={pathTo(Menu.Balance)} element={<BalancePage />} />
          <Route path={pathTo(Menu.Year)} element={<YearPage />} />
          <Route path={pathTo(Menu.Bank)} element={
            <BankPage 
              bankDatas={year ? year.getBankItems(): []}
              onChange={(datas) => handleChangeBank(datas)}
            />} 
          />
          <Route path={pathTo(Menu.Cash)} element={
            
            <CashPage 
              cashDatas={year ? year.getCashItems(): []} 
              onChange={(datas) => handleChangeCash(datas)}
            />
             
          } />
          <Route path={pathTo(Menu.Tools)} element={<ToolsPage handleUpdate={userUpdate} />} />
          <Route path="*" element={<Navigate to={pathTo(Menu.Home)} />} />
        </Routes>
      </main>
      <Footer>
        <NavLink
          to={pathTo(Menu.Year)}
          className="btn btn-dark btn-menu"
          data-menu={Menu.Year}
          onClick={(e) => changePage(e)}
        >
          <FaCalendar />
          {year ? year.id : "NC"}
        </NavLink>

        <NavLink
          to={pathTo(Menu.Bank)}
          className="btn btn-dark btn-menu"
          data-menu={Menu.Bank}
          onClick={(e) => changePage(e)}
        >
          <BsBank />
          {year ? year.getBankTotal() : "NC"}
        </NavLink>

        <NavLink
          to={pathTo(Menu.Cash)}
          className="btn btn-dark btn-menu"
          data-menu={Menu.Cash}
          onClick={(e) => changePage(e)}
        >
          <FaPiggyBank />
          {year ? year.getCashTotal() : "NC"}
        </NavLink>
      </Footer>

      {<UserInit show={!user.name} handleInit={userUpdate} />}

    </div>

  );
}

