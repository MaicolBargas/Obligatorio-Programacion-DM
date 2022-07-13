import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Alert, Text, TouchableOpacity } from "react-native";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ModificarReparacion = ({route, navigation}) => {
    
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [auto, setAuto] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [costo, setCosto] = useState('');

    useEffect(() => {
        setId(route.params.id);
        setNombre(route.params.nombre);
        setAuto(route.params.auto);
        setFechaInicio(route.params.fechaInicio);
        setFechaFin(route.params.fechaFin);
        setCosto(route.params.costo);

    }, []);
   
    const editData = () => { 
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE reparacion set nombre=?, auto=? , fechaInicio=?,fechaFin=?, costo=? where id=?',
          [ nombre, auto, fechaInicio, fechaFin, costo,id ],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
              'Hecho',
              'Reparacion modificada con éxito',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Reparacion'),
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
          'DELETE FROM reparacion where id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
              'Hecho',
              'Reparacion eliminado con éxito',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Reparacion'),
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
                placeholder="Id"
                onChangeText={setId}
                value={id}
                style={styles.textInputStyle}                
                disabled = {true}
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Nombre"
                onChangeText={setNombre}
                value={nombre}
                maxLength={25}
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Auto"
                onChangeText={setAuto}
                value={auto}
                disabled = {true}
              />
                    
                <TextInput
                placeholder="Fecha Inicio"
                onChangeText={setFechaInicio}
                value={fechaInicio}
                style={styles.textInputStyle}                
                disabled = {true}
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Fecha Fin"
                onChangeText={setFechaFin}
                value={fechaFin}
                
              />

              <TextInput
                placeholder="Costo"
                onChangeText={setCosto}
                value={costo}
                style={styles.textInputStyle}
                keyboardType={'numeric'}
              />

          <TouchableOpacity
            style={styles.touchableOpacityEdit}
            onPress={editData}>
  
            <Text style={styles.touchableOpacityTextEdit} > Editar Reparacion </Text>
          </TouchableOpacity>
   
          <TouchableOpacity
          style={styles.touchableOpacityDelete}
            onPress={deleteRecord}> 
            <Text  style={styles.touchableOpacityTextDelete}> Elimiar Reparacion </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

export default ModificarReparacion;

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
