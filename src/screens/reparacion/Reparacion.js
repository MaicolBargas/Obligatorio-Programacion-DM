import React,{useEffect} from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from '../../database/database'
const db = DatabaseConnection.getConnection();

const Reparacion = ({navigation}) => {

    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='reparacion'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS reparacion', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS reparacion( id int primary key, nombre VARCHAR(20), auto VARCHAR(7), fechaInicio date, fechaFin date, costo int)',
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
                  title="Alta Reparacion"
                  btnColor="green"
                  btnIcon="plus"
                  customPress={() => navigation.navigate('AltaReparacion')}
                />
                <MyButton
                  title="Lista Reparacion"
                  btnColor="blue"
                  btnIcon="list-alt"
                  customPress={() => navigation.navigate("ListarReparacion")}
                />

                <MyButton
                  title="Agregar Insumos y Repuestos"
                  btnColor="pink"
                  btnIcon="wrench"
                  customPress={() => navigation.navigate("ReparacionAdd")}
                />                                       
              </ScrollView>
            </View>
          </View>
          </View>
          </SafeAreaView>
    )

}
export default Reparacion;