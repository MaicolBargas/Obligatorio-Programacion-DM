import React,{useEffect} from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from '../../database/database'
const db = DatabaseConnection.getConnection();


const Usuarios = ({navigation}) => {

    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='usuario'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS usuario', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS usuario( ci int primary key, nombre VARCHAR(20), apellido VARCHAR(20), matriculaAuto VARCHAR(7) unique)  ',
                  []
                );
              }
            }
          );
        });
      }, []);

    return(
        <SafeAreaView>
        <View >
          <View>
            <View >
              <ScrollView>
                <MyButton
                  title="Alta Usuario"
                  btnColor="green"
                  btnIcon="plus"
                  customPress={() => navigation.navigate('AltaUsuario')}
                />
                <MyButton
                  title="Lista Usuario"
                  btnColor="blue"
                  btnIcon="list-alt"
                  customPress={() => navigation.navigate("ListarUsuario")}
                />                                      
              </ScrollView>
            </View>
          </View>
          </View>
          </SafeAreaView>
    )

}
export default Usuarios;