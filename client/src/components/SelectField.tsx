import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { OptionProps } from '../utils/types';

const SelectField = ({placeholder, disabled =false, onChange, multiple =false, itemsName ='', data =[]}: {itemsName?: string, onChange: Function, disabled?:boolean, placeholder?:string, multiple?:boolean, data: OptionProps[]}) => {
    
    const [showDropdown, setShowDropdown] =useState(false);
    const [selectedItems, setSelectedItems] = useState<OptionProps[]>([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            //@ts-ignore
            if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);
    
    const handleItemClick = (value:string, label:string) => {
        if(multiple){
            
            setSelectedItems(prevSelectedItems => {
                const isSelected = prevSelectedItems.some(item => item.value === value);
                if (isSelected) {
                    return prevSelectedItems.filter(item => item.value !== value);
                } else {
                    return [...prevSelectedItems, { value, label }];
                }
            });
            const values =selectedItems.map((item: OptionProps) =>item.value)
            return onChange(values.includes(value)? values.filter(val =>val !==value): [...values, value])

        }
        setSelectedItems([{value, label}])
        setShowDropdown(false);
        return onChange(value);
        
    };
    return (
        <div className='relative' ref={dropdownRef}>
            <div className={`border w-full px-4 py-3 select-none ${disabled? 'bg-[#f9f9f9] cursor-default' :'bg-white cursor-pointer'} ${(showDropdown && data.length) && !disabled? 'border-b-0': ''} rounded flex items-center justify-between`} onClick={() =>{setShowDropdown(prev =>!prev)}}>
                {selectedItems.length? selectedItems.length <4? selectedItems.map(item => item.label).join(', '): `${selectedItems.length} ${itemsName} selected`: <span className='text-zinc-600'>{placeholder}</span>}
                <FontAwesomeIcon icon={showDropdown || disabled? faAngleUp:faAngleDown}/>
            </div>
            <ul className={`bg-white pt-0 p-4 border border-t-0 ${(showDropdown && data.length) && !disabled? '': 'hidden'} select-none rounded max-h-[250px] absolute w-full overflow-auto`}>
                {data.map(({value, label}, index: number) =>(<li key={index} className='flex items-center gap-3 p-4 rounded cursor-pointer hover:bg-zinc-200' onClick={() =>handleItemClick(value, label)}>
                    <input type='checkbox' className='cursor-pointer' value={value}
                        checked={selectedItems.some(item => item.value === value)}
                        hidden ={!multiple}
                        readOnly
                    /> 
                    <span>{label}</span></li>))}
            </ul>
        </div>
    )
}

export default SelectField
