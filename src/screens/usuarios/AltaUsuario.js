import React, { useState } from "react";
import { View, SafeAreaView, Alert,StyleSheet, TouchableOpacity, TextInput,Text} from "react-native";
import DropDownVehiculos from "../../components/DropDownVehiculos";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const AltaUsuario = ({ navigation }) => {

  const [ci, setCi] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [matriculaAuto, setMatriculaAuto] = useState('');

  const clearData = () => {
    setCi("");
    setNombre("");
    setApellido("");
    setMatriculaAuto("");
  };

  const altaV = () => {
    console.log("states",ci, nombre, apellido, matriculaAuto);
  
    if (!ci.trim() || !nombre.trim()|| !apellido.trim()|| !matriculaAuto.trim())  {
      Alert.alert("Debe ingresar todos los datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO usuario (ci, nombre, apellido, matriculaAuto) VALUES (?, ?, ?, ?)`,
        [ci, nombre, apellido, matriculaAuto],
        (tx, results) => {
          console.log("results", results);        
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Excelente",
              "Usuario dado de Alta!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Usuarios"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar vehiculo");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} >
        <View style={styles.mainContainer} >
              <TextInput
                placeholder="C.I."
                onChangeText={setCi}
                value={ci}
                style={styles.textInputStyle}
                maxLength={8}
                keyboardType={'numeric'}
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Nombre"
                onChangeText={setNombre}
                value={nombre}
                maxLength={25}
              />

              <TextInput
                placeholder="Apellido"
                onChangeText={setApellido}
                value={apellido}
                style={styles.textInputStyle}
                maxLength={25}
              />
              
              <TextInput
                placeholder="Matricula de Vehiculo"
                value={matriculaAuto}
                style={styles.textInputStyle}
                disabled={true}
              />
              <View style={styles.dropDown}>
                  <DropDownVehiculos
                  selected={setMatriculaAuto}                  
                  />
              </View>
            <TouchableOpacity
                style={styles.touchableOpacityRegister}
                onPress={altaV}>
                <Text style={styles.touchableOpacityTextRegister} > Alta Vehiculo </Text>
            </TouchableOpacity>
         
        </View>
    </SafeAreaView>
  );
};

export default AltaUsuario;

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
