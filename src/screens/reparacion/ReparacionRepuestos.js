import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import DropDownInsumos from "../../components/DropDownInsumos";
import DropDownRepuestos from "../../components/DropDownRepuestos";

import DatabaseConnection from '../../database/database'
const db = DatabaseConnection.getConnection();

const ReparacionRepuestos = ({route,navigation}) => {

  const [idReparacion, setIdReparacion] = useState('');
  const [idInsumo, setIdInsumo] = useState('');
  const [idRepuesto, setIdRepuesto] = useState('');
    useEffect(() => {
        setIdReparacion(route.params.id)

        db.transaction( (txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='reparacionRepuestos'",
            [],
             (tx, res) =>{
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS reparacionRepuestos', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS reparacionRepuestos( idReparacion int, idRepuesto int)',
                  []
                );
              }
            }
          );
        });

        db.transaction( (txn) => {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='reparacionInsumos'",
              [],
               (tx, res) =>{
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS reparacionInsumos', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS reparacionInsumos( idReparacion int, idInsumo int)',
                    []
                  );
                }
              }
            );
          });
      }, []);

      const AgregarAReparacion = () => {

        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO reparacionRepuestos (idReparacion, idRepuesto) VALUES (?, ?)`,
            [idReparacion, idRepuesto],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                navigation.navigate("Reparacion")
              } else {
                Alert.alert("Error al agregar Repuesto");
              }
            }
          );
        });

        db.transaction((tx) => {
            tx.executeSql(
              `INSERT INTO reparacionInsumos (idReparacion, idInsumo) VALUES (?, ?)`,
              [idReparacion, idInsumo],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  navigation.navigate("Reparacion")
                } else {
                  Alert.alert("Error al agregar Insumo");
                }
              }
            );
          });
      };
    return(
        <SafeAreaView>
        <View >
            <TextInput
                placeholder="Id"
                value={idReparacion}
                style={styles.textInputStyle}                
                onChangeText={setIdReparacion}
                disabled = {true}
              />
            <TextInput
                placeholder="Id Insumo"
                value={idInsumo}
                style={styles.textInputStyle}                
                onChangeText={setIdInsumo}
              />
              <View style={styles.dropDown}>
                <DropDownInsumos 
                  selected={setIdInsumo}
                  />
                </View>
            <TextInput
                placeholder="Id Repuesto"
                value={idRepuesto}
                style={styles.textInputStyle}
                onChangeText={setIdRepuesto}
              />
              <View style={styles.dropDown}>
                  <DropDownRepuestos
                  selected={setIdRepuesto}
                  />
                </View>

                <TouchableOpacity
                style={styles.touchableOpacityRegister}
                onPress={AgregarAReparacion}
                >
                <Text style={styles.touchableOpacityTextRegister} > Agregar a Reparacion </Text>
            </TouchableOpacity>
          </View>
          </SafeAreaView>
    )

}
export default ReparacionRepuestos;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
  
    touchableOpacityRegister: {
      backgroundColor: 'green',
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%'
    },
  
    touchableOpacityTextRegister: {
      color: 'black',
      fontSize: 23,
      textAlign: 'center',
      padding: 3
    },
  
    textInputStyle: {
      height: 50,
      width: '100%',
      textAlign: 'center',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 7,
      marginTop: 10,
    },
    dropDown:{
      height: 50,
      width: '100%',
      marginTop:5
    }
  });
