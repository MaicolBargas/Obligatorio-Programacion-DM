import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Alert, Text, TouchableOpacity } from "react-native";


import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ModificarVehiculo = ({route, navigation}) => {
    
    const [S_Matricula, setMatricula] = useState('');
    const [S_Marca, setMarca] = useState('');
    const [S_Color, setColor] = useState();
    const [S_SerialMotor, setSerialMotor] = useState('');
   
    useEffect(() => {

 
       setMarca(route.params.marca);
        setColor(route.params.color);
        setSerialMotor(route.params.serialMotor);
        setMatricula(route.params.matricula);

   
    }, []);
   
    const editData = () => { 
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE vehiculo set marca=?, color=? , serialMotor=? where matricula=?',
          [S_Marca, S_Color, S_SerialMotor, S_Matricula],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Vehiculo modificado con éxito')
            } else Alert.alert('Error');
          }
        );
      });
    }
   
    const deleteRecord = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM vehiculo where matricula=?',
          [S_Matricula],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
                Alert.alert(
                'Hecho',
                'Vehiculo eliminado con éxito',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Vehiculos'),
                  },
                ],
                { cancelable: false }
              );
            }
          }
        );
      });
   
    }
   
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <TextInput            
            onChangeText={
              (text) => setMatricula(text)
            }
            placeholder="Ingresa matricula"
            value={S_Matricula} 
            style={styles.textInputStyle}
            disabled = {true}/>
   
          <TextInput
            onChangeText={
              (text) => setMarca(text)
            }
            placeholder="Ingresa marca"
            value={S_Marca} 
            style={styles.textInputStyle}/>
   
          <TextInput
            onChangeText={
              (text) => setColor(text)
            }
            placeholder="Ingresa color"
            value={S_Color} 
            style={styles.textInputStyle}/>
   
           <TextInput
            onChangeText={
              (text) => setSerialMotor(text)
            }
            placeholder="Ingresa serial del motor"
            value={S_SerialMotor} 
            style={styles.textInputStyle}/>

          <TouchableOpacity
            style={styles.touchableOpacityEdit}
            onPress={editData}>
  
            <Text style={styles.touchableOpacityTextEdit} > Editar Vehiculo </Text>
          </TouchableOpacity>
   
          <TouchableOpacity
          style={styles.touchableOpacityDelete}
            onPress={deleteRecord}> 
            <Text  style={styles.touchableOpacityTextDelete}> Elimiar vehiculo </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

export default ModificarVehiculo;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
  
    touchableOpacityEdit: {
      backgroundColor: 'yellow',
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%'
    },

    touchableOpacityDelete: {
        backgroundColor: 'red',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
      },
  
    touchableOpacityTextEdit: {
      color: 'black',
      fontSize: 23,
      textAlign: 'center',
      padding: 8
    },

    touchableOpacityTextDelete: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        padding: 8
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
