import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, Text, TouchableOpacity } from "react-native";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ReparacionAdd = ({navigation}) => {

    const [items, setItems] = useState([]);
    const [empty, setEmpty] = useState([]);

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM reparacion',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setItems(temp);
   
            if (results.rows.length >= 1) {
              setEmpty(false);
            } else {
              setEmpty(true)
            }
   
          }
        );
   
      });
    }, []);
   
    const listViewItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#000'
          }}
        />
      );
    };
   
    const emptyMSG = (status) => {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
   
          <Text style={{ fontSize: 25, textAlign: 'center' }}>
            No hay datos ingresados en la base de datos.
            </Text>
   
        </View>
      );
    }
   
    const navigateToAddScreen = (id, nombre, auto, fechaInicio, fechaFin, costo) => {
   
      navigation.navigate('ReparacionRepuestos', {
        id : id, 
        nombre :nombre, 
        auto :auto , 
        fechaInicio:fechaInicio , 
        fechaFin:fechaFin ,
        costo:costo 
      });
    }
   
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {empty ? emptyMSG(empty) :
   
            <FlatList
              data={items}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View key={item.id} style={{ padding: 20 }}>
                  <TouchableOpacity onPress={() => navigateToAddScreen(item.id.toString(), item.nombre, item.auto.toString(), item.fechaInicio, 
                                                                        item.fechaFin, item.costo.toString())} >
                    <Text> Id: {item.id} </Text>
                    <Text> Descripcion: {item.nombre} </Text>
                    <Text> Auto : {item.auto} </Text>
                    <Text> Fecha Inicio: {item.fechaInicio} </Text>
                    <Text> Fecha Fin: {item.fechaFin} </Text>
                    <Text> Costo: {item.costo} </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          }
        </View>
      </SafeAreaView>
   
    );
};

export default ReparacionAdd;



