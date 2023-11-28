import {memo} from "react";

export const Select = memo(({defaultName, defaultValue, listItems, changeSelect, keyName, disable=false})=>{
    const handleChangeSelect = (event)=>{
        changeSelect(keyName, event.target.value)
    }
    return (
        <select className="form-select" onChange={(handleChangeSelect)} disabled={disable}>
            <option selected value={defaultValue}>{defaultName}</option>
            {listItems.map((item, index)=><option key={index} value={item.value}>{item.label}</option>)}
        </select>
    )
})
