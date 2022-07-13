import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, Text, TouchableOpacity } from "react-native";
import { YellowBox } from "react-native-web";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ReparacionDetalle = ({route,navigation}) => {

    const [id, setId] = useState('');
    const [auto, setAuto] = useState('');
    const [reparacion, setReparacion] = useState([]);
    const [insumos, setInsumos] = useState([]);
    const [repuestos, setRepuestos] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setId(route.params.id);
        setAuto(route.params.auto);
        ListarReparacion();
        ListarRepuestos();
        ListarInsumos();
        ListarVehiculo();
        ListarUsusario();
    }, []);

    const ListarReparacion = () =>{
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM reparacion where id = ?',
          [route.params.id],
          (tx, results) => {
            if (results.rows.length > 0) {
              var temp = [];
              for(let i = 0; i < results.rows.length; ++i)
              {
                temp.push(results.rows.item(i));  
              }
              setReparacion(temp);
              console.log(temp)
              console.log(reparacion)

            } 
          }
        );
      });
    }

    const ListarRepuestos = () => {

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM repuesto r inner join reparacionRepuestos rr on r.id = rr.idRepuesto where rr.idReparacion = ?',
          [route.params.id],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
            {
              temp.push(results.rows.item(i));
              setRepuestos(temp);
            }
            });
      });
    }

    const ListarInsumos = () =>{
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM insumo i inner join reparacionInsumos ri on i.id = ri.idInsumo where ri.idReparacion = ?',
          [route.params.id],
          (tx, results) => {
            var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          {
              temp.push(results.rows.item(i));
              setInsumos(temp);
          }
          });
      });
    }

    const ListarVehiculo = () =>{
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM vehiculo where matricula = ?',
          [route.params.auto],
          (tx, results) => {
            var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          {
              temp.push(results.rows.item(i));
              setVehiculos(temp);
          }
          });
      });
    } 

    const ListarUsusario = () =>{
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM usuario where matriculaAuto = ?',
          [route.params.auto],
          (tx, results) => {
            var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          {
              temp.push(results.rows.item(i));
              setUsuarios(temp);
          }
          });
      });
    } 

    return (
      <SafeAreaView style={styles.mainContainer }>

            <FlatList
              data={reparacion}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View key={item.id} style={styles.ContainerReparacion}>
                    <Text style={styles.TextTittle}> Reparacion: </Text>
                    <Text style={styles.TextDatos}> Id: {item.id} </Text>
                    <Text style={styles.TextDatos}> Descripcion: {item.nombre} </Text>
                    <Text style={styles.TextDatos}> Fecha Inicio: {item.fechaInicio} </Text>
                    <Text style={styles.TextDatos}> Fecha Fin: {item.fechaFin} </Text>
                    <Text style={styles.TextDatos}>  Costo: $ {item.costo} </Text>
                </View>
              }
            />
          <View>
            
              <View style={styles.ContainerInsumos}>
                      <Text style={styles.TextTittle}> Repuestos: </Text>
                  <FlatList
                    data={repuestos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                          <Text style={styles.TextDatos}>-{item.nombre}. </Text>
                  }/>

                </View>
                <View style={styles.ContainerInsumos}>
                      <Text style={styles.TextTittle}> Insumos: </Text>
                  <FlatList
                    data={insumos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                          <Text style={styles.TextDatos}>-{item.nombre}. </Text>
                    }
                  />
                </View>
          </View>
            <FlatList
              data={vehiculos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
              <View key={item.id} style={styles.ContainerVehiculos}>
                    <Text style={styles.TextTittle}>  Vehiculo: </Text>
                    <Text style={styles.TextDatos}> Matricula: {item.matricula}  </Text>
                    <Text style={styles.TextDatos}> Marca: {item.marca}  </Text>
              </View>
              }
            />
             
            <FlatList
              data={usuarios}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View key={item.id} style={styles.ContainerUsuarios}>                  
                    <Text style={styles.TextTittle}> Dueño del Vehiculo: </Text>
                    <Text style={styles.TextDatos}> {item.nombre} {item.apellido}</Text>
                </View>
              }
            />
      </SafeAreaView>
   
    );
};

export default ReparacionDetalle;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  TextDatos:{
    fontSize:15,
  },
  TextTittle:{
    fontSize:20,
    color: "white"
  },
  ContainerReparacion:{
    flex: 1,
    padding: 10,
    backgroundColor: "skyblue",
    borderRadius: 10
  },
  ContainerInsumos:{
    flex: 1,
    padding: 10,
    backgroundColor: "pink",
    marginBottom: 5,
    marginTop:5 ,
    borderRadius: 10,
  },
  ContainerUsuarios:{
    flex: 1,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 10
  },
  ContainerVehiculos:{
    flex: 1,
    padding: 10,
    backgroundColor: "skyblue",
    borderRadius: 10,
    marginBottom: 5,

  },
});