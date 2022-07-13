import React, { useState,useEffect } from "react";
import {Picker} from "@react-native-picker/picker";



import DatabaseConnection from "../database/database";
const db = DatabaseConnection.getConnection();

const DropDownVehiculos = ({selected}) =>{
  
    const [items, setItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

   

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT matricula FROM vehiculo',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
            {
           var {matricula} = results.rows.item(i)
           var element = {id: matricula, label: matricula}
           temp.push(element)
           setItems(temp);
        }
          }
        );
   
      });
    }, []);

    return (
        <Picker           
         style={{ height: 50, width: 150 }}
         onValueChange={(selectedValue) => { 
            setSelectedValue(selectedValue);
            selected(selectedValue);
            }}
          >
        {items.map((items) => {
          return  <Picker.Item key={items.id} value={items.label} label={items.label} />;
        })}
      </Picker>

      );
    
}


export default DropDownVehiculos;  
  


