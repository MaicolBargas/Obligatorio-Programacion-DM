import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Alert, Text, TouchableOpacity } from "react-native";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ModificarRepuesto = ({route, navigation}) => {
    
    const [S_Id, setId] = useState('');
    const [S_Nombre, setNombre] = useState('');
    const [S_Cantidad, setCantidad] = useState();
   
    useEffect(() => {
        setId(route.params.id);
        setNombre(route.params.nombre);
        setCantidad(route.params.cantidad);
    }, []);
   
    const editData = () => { 
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE repuesto set nombre=?, cantidad=? where id=?',
          [S_Nombre, S_Cantidad, S_Id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
              'Hecho',
              'Repuesto modificado con éxito',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Repuestos'),
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
          'DELETE FROM repuesto where id=?',
          [S_Id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
              'Hecho',
              'Repuesto eliminado con éxito',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Repuestos'),
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
              (text) => setId(text)
            }
            placeholder="Ingresa id"
            value={S_Id} 
            style={styles.textInputStyle}
            disabled = {true}/>
   
          <TextInput
            onChangeText={
              (text) => setNombre(text)
            }
            placeholder="Ingresa nombre"
            value={S_Nombre} 
            style={styles.textInputStyle}/>
   
          <TextInput
            onChangeText={
              (text) => setCantidad(text)
            }
            placeholder="Ingresa cantidad"
            value={S_Cantidad} 
            style={styles.textInputStyle}/>

          <TouchableOpacity
            style={styles.touchableOpacityEdit}
            onPress={editData}>
  
            <Text style={styles.touchableOpacityTextEdit} > Editar Repuesto </Text>
          </TouchableOpacity>
   
          <TouchableOpacity
          style={styles.touchableOpacityDelete}
            onPress={deleteRecord}> 
            <Text  style={styles.touchableOpacityTextDelete}> Elimiar Repuesto </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

export default ModificarRepuesto;

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
