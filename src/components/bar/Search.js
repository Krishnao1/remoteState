import React from 'react'
import Select from 'react-select';

export default function TopSearch({data, setData}) {
   
    return (
        <div>
            <Select 
                onChange={(e)=>{setData(e);}}
                closeMenuOnSelect={false}
                isMulti
                options={data.map((d)=>({value :d.truckNumber, label : d.truckNumber}))}
            />
        </div>
    )
}
