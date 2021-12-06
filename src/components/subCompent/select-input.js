import React, {useState} from 'react'

const SelectInput = ({data}) => {
    const [selectedState, setSelectedState] = useState(null);
    
    return (
        <select >
            {
                data.map((item)=><option  value={item.truckNumber}>{item.truckNumber}</option>)
            }
        </select>
    )
}