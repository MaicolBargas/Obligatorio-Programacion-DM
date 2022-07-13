import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert,StyleSheet, TouchableOpacity, TextInput,Text} from "react-native";


import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const AltaVehiculo = ({ navigation }) => {

  const [Matricula, setMatricula] = useState('');
  const [Marca, setMarca] = useState('');
  const [Color, setColor] = useState('');
  const [Serial, setSerial] = useState('');

  const clearData = () => {
    setMatricula("");
    setMarca("");
    setColor("");
    setSerial("");
  };

  const altaV = () => {
    console.log("states",Matricula, Marca, Color, Serial);
  
    if (!Matricula.trim() || !Marca.trim()|| !Color.trim()|| !Serial.trim())  {
      Alert.alert("Debe ingresar todos los datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO vehiculo (matricula, marca, color, serialMotor) VALUES (?, ?, ?, ?)`,
        [Matricula, Marca, Color, Serial],
        (tx, results) => {
          console.log("results", results);        
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Excelente",
              "Vehiculo dado de Alta!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Vehiculos"),
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
                placeholder="Matricula"
                onChangeText={setMatricula}
                value={Matricula}
                style={styles.textInputStyle}
                maxLength={7}
                
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Marca"
                onChangeText={setMarca}
                value={Marca}
              />

              <TextInput
                placeholder="Color"
                onChangeText={setColor}
                value={Color}
                style={styles.textInputStyle}

              />

                <TextInput
                placeholder="Serial de motor"
                onChangeText={setSerial}
                value={Serial}
                style={styles.textInputStyle}
                maxLength={25}
              />

              <TouchableOpacity
            style={styles.touchableOpacityRegister}
            onPress={altaV}>
            <Text style={styles.touchableOpacityTextRegister} > Alta Vehiculo </Text>
          </TouchableOpacity>
         
        </View>
    </SafeAreaView>
  );
};

export default AltaVehiculo;

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

});
