import React, { useState,useEffect } from "react";
import {Picker} from "@react-native-picker/picker";

import DatabaseConnection from "../database/database";
const db = DatabaseConnection.getConnection();

const DropDownInsumos = ({selected}) =>{
  
    const [items, setItems] = useState([{}]);
    const [selectedValue, setSelectedValue] = useState("");
    
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT id, nombre FROM insumo',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
            {
           var {id, nombre} = results.rows.item(i)
           var element = {id: id, label: nombre}
           console.log(element)
           temp.push(element)
           setItems(temp);
        }
          }
        );
   
      });
    }, []);

    return (
        <Picker           
         style={{ height: 35, width: 150 }}
         onValueChange={(selectedValue) => { 
            setSelectedValue(selectedValue);
            selected(selectedValue);
            }}
        >
        {items.map((items) => {
          return  <Picker.Item key={items.id} value={items.id} label={items.label} />;
        })}
      </Picker>

      );
    
}

export default DropDownInsumos;  
  


