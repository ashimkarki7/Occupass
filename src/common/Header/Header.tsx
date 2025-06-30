import  { useCallback, useState,Fragment } from 'react';
import { useLocation,NavLink,useNavigate } from 'react-router-dom';
import HeaderStyles from './Header.module.scss';
import {
  PhoneSvg,
  LogoSvg,
  HeartSvg,
  ViewBoxSvg,
  SearchIconSvg,
  DropDownSvg,
} from '@assets/svg';
import Button from '@/components/Button/Button.tsx';
import { mainRoutesList } from '@routes/RouteListItems.tsx';
import type { RouteItem } from '@routes/routes.ts';
import DropdownComponent from '@/components/Dropdown/Dropdown.tsx';
import type { IObjectLiteral } from '@common/types.ts';



export const Header = () => {
  document.documentElement.setAttribute('data-theme', 'light');
  const [dropdownOpen, setDropdownOpen] = useState({
    name: '',
    isOpen: false,
  });
  const navigate = useNavigate();

  const location = useLocation();

  const renderDropDown = useCallback((options: any) => (
    <Fragment>
      {options?.filter((filterItems: { exact?: boolean }) => filterItems?.exact)?.map((optionItem: IObjectLiteral) => (
        <li     style={{ color:optionItem.path === location.pathname ?'#FF8000'  : ''} }  key={optionItem.key} onClick={() => {
          navigate(`${optionItem?.path}`);
        }}>{optionItem?.name}</li>
      ))}
    </Fragment>
  ), [location]);


  return (
    <header id="Header" className={HeaderStyles.headerContainer}>
      <div
        id={'primary-header'}
        key={'primary-header'}
        className={HeaderStyles.header_banner}
      >
        <div
          style={{
            minHeight: '24px',
            alignItems: 'flex-start',
            display: 'flex',
            gap: '0.3em',
          }}
        >
          <span>
            <PhoneSvg />
          </span>
          <span
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: ' 14px',
              fontWeight: '400',
              display: 'contents',
            }}
          >
            +9779818246138
          </span>
        </div>
        <div
          style={{
            minHeight: '24px',
          }}
        >
          TAKE CARE OF YOUR Health 25% OFF USE CODE “ DOFIX03 ”
        </div>
        <div
          id={'HeaderOptions'}
          style={{
            minHeight: '24px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: '1em',
            fontSize: ' 14px',
            fontWeight: '500',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.1em',
            }}
          >
            English
            <DropDownSvg />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.1em',
            }}
          >
            USD
            <DropDownSvg />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.1em',
            }}
          >
            Settings
            <DropDownSvg />
          </div>
        </div>
      </div>
      <div id={'secondary-header'} className={HeaderStyles.header_menu}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: '80px',
          }}
        >
          <LogoSvg />

          <div id={'menu-items'} className={HeaderStyles.menu_item}>
            <nav>
              <ul
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                }}
              >
                {mainRoutesList?.filter((filter => filter?.exact))?.map((routeItems: RouteItem) => (
                  <NavLink    id={`nav${routeItems.key}`}   key={`nav${routeItems.key}`} to={`${routeItems?.path}`}   state={{ from: 'header' }} >
                  <li
                    className={`${routeItems.path === location.pathname ? HeaderStyles.active : ''}`}
                    id={`routeItem${routeItems.key}`}   key={routeItems.key}>{routeItems?.name}</li>
                  </NavLink>
                ))?.slice(0,2)}
              </ul>
            </nav>
          </div>
        </div>
        <div
          id={'HeaderOptions'}
          style={{
            minHeight: '24px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: '2em',
            fontSize: ' 14px',
            fontWeight: '500',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '1em',
            }}
          >
            <input
              className={HeaderStyles.search_input}
              placeholder="Search..."
              id={'search_input'}
              anchor-name="search-input"
            />
            <Button
              ariaLabel="Search"
              anchor-target="search-input"
              hasIconOnly={true}
              title={<SearchIconSvg />}
              onClickHandler={() => {
                console.log('search clicked');
              }}
              className={HeaderStyles.btnSearch}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <HeartSvg />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ViewBoxSvg />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div className={HeaderStyles.bar_icon}
                   onClick={() =>
                     setDropdownOpen({
                       name: 'menu',
                       isOpen:
                         dropdownOpen.name !== 'menu' || !dropdownOpen.isOpen,
                     })
                   }
              >
                <span /> <span /> <span />
                {dropdownOpen.name === 'menu' && dropdownOpen.isOpen && (
                  <DropdownComponent
                    renderDropDown={renderDropDown}
                    options={mainRoutesList}
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
