import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import DropDownVehiculos from "../../components/DropDownVehiculos";
import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ModificarUsuario = ({route, navigation}) => {
    
    const [S_Ci, setCi] = useState();
    const [S_Nombre, setNombre] = useState('');
    const [S_Apellido, setApellido] = useState();
    const [S_Vehiculo, setVehiculo] = useState();

   
    useEffect(() => {
        setCi(route.params.ci);
        setNombre(route.params.nombre);
        setApellido(route.params.apellido);
        setVehiculo(route.params.matriculaAuto);

    }, []);
   
    const editData = () => { 
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE usuario set nombre=?, apellido=?, matriculaAuto=? where ci=?',
          [ S_Nombre, S_Apellido,S_Vehiculo,S_Ci],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
              'Hecho',
              'Usuario modificado con éxito',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Usuarios'),
                },
              ],
              { cancelable: false }
            );
          }
          }
        );
      });
    }
   
    const deleteRecord = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM usuario where ci=?',
          [S_Ci],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
              'Hecho',
              'Usuario eliminado con éxito',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Usuarios'),
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
              (text) => setCi(text)
            }
            placeholder="Ingresa C.I."
            value={S_Ci} 
            style={styles.textInputStyle}
            disabled = {true}            
            />
   
          <TextInput
            onChangeText={
              (text) => setNombre(text)
            }
            placeholder="Ingresa Nombre"
            value={S_Nombre} 
            style={styles.textInputStyle}/>
   
          <TextInput
            onChangeText={
              (text) => setApellido(text)
            }
            placeholder="Ingresa Apellido"
            value={S_Apellido} 
            style={styles.textInputStyle}/>

          <TextInput
            value={S_Vehiculo} 
            style={styles.textInputStyle}
            disabled = {true}
            />
          <View style={styles.dropDown}>
                  <DropDownVehiculos
                  selected={setVehiculo}
                  
                  />
          </View>

          <TouchableOpacity
            style={styles.touchableOpacityEdit}
            onPress={editData}>
            <Text style={styles.touchableOpacityTextEdit} > Editar Usuario </Text>
          </TouchableOpacity>
   
          <TouchableOpacity
          style={styles.touchableOpacityDelete}
            onPress={deleteRecord}> 
            <Text  style={styles.touchableOpacityTextDelete}> Elimiar Usuario </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

export default ModificarUsuario;

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
    dropDown:{
      height: 50,
      width: '100%',
      marginTop:5
    }
  });
