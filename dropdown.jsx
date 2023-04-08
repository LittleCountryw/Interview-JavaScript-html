// state:checked记录是否被点击 为true展示选项
//value选中的值
//为每个option添加onclick事件 根据e.target.innerText获取文本设置给value setCheckd(false)
import { useState, useEffect, useRef } from 'react';
interface selectProps {
  option: any;
  defaultValue: string;
  selectStyle?: object;
  onSelect?: Function;
}
const Select = (props: selectProps) => {
  const { option } = props;
  const { defaultValue, selectStyle, onSelect } = props;
  let [checked, setChecked] = useState(false);
  let [value, setValue] = useState(defaultValue);
  let selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const selectCheck = (e: any) => {
      if (!(selectRef.current as HTMLDivElement).contains(e.target)) {
        console.log('select元素不包含点击元素', selectRef.current, e.target);
        setChecked(false);
      }
    };
    document.addEventListener('click', selectCheck);
    return () => document.removeEventListener('click', selectCheck);
  }, []);
  // 点击显示下拉菜单
  const checkedItem = (e: any) => {
    console.log('checkedItem', checked);

    // e.stopPropagation();
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  // 点击option触发
  const checkedOption = (e: any) => {
    setValue(e.target.innerText);
    onSelect && onSelect(e.target.innerText);
    setChecked(false);
  };

  return (
    <>
      <div
        className={style.cSelect}
        style={selectStyle}
        ref={selectRef}
        onClick={checkedItem}
      >
        <div className={style.select}>
          <div className={style.selectItem}>
            <div className={style.defaultValue}>
              <div className={style.value}>{value}</div>
              {!checked ? (
                <div className={style.downLined}></div>
              ) : (
                <div className={style.upLined}></div>
              )}
            </div>
            {checked
              ? option.map((item: string, index: number) => {
                  return (
                    <div
                      className={style.option}
                      key={index}
                      onClick={checkedOption}
                    >
                      {item}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;