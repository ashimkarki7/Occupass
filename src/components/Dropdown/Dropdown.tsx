import DropDownStyles from './DropDown.module.scss';
const DropdownComponent = (props: any) => {
  const {options,renderDropDown } = props;


  return (
    <div id={'options'} className={DropDownStyles?.dropdown}>
      <ul className={DropDownStyles?.dropdownMenu}>
        {renderDropDown(options)}
      </ul>
    </div>
  );
};

export default DropdownComponent;
