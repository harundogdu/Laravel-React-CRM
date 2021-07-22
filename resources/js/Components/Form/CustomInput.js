import React from "react";

const CustomInput = ({type = 'text',placeholder,handleChange,handleBlur,value,title}) => {
    return (
        <div className="form-floating">
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
            />
            <label>{title}</label>            
        </div>
    );
};

export default CustomInput;
