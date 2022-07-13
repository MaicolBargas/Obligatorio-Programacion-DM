import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

//#region imports
import Home from '../screens/Home'
import Vehiculos from '../screens/vehiculos/Vehiculos'
import AltaVehiculo from "../screens/vehiculos/AltaVehiculo";
import ModificarVehiculo from "../screens/vehiculos/ModificarVehiculo";
import ListarVehiculo from "../screens/vehiculos/ListarVehiculo";
import Insumos from '../screens/insumos/Insumos';
import AltaInsumo from '../screens/insumos/AltaInsumo';
import ListarInsumo from '../screens/insumos/ListarInsumo';
import ModificarInsumo from '../screens/insumos/ModificarInsumo';
import Usuarios from '../screens/usuarios/Usuarios';
import AltaUsuario from '../screens/usuarios/AltaUsuario';
import ListarUsuario from '../screens/usuarios/ListarUsuario';
import ModificarUsuario from '../screens/usuarios/ModificarUsuario';
import Repuestos from '../screens/repuestos/Repuestos'
import AltaRepuesto from '../screens/repuestos/AltaRepuesto'
import ListarRepuesto from '../screens/repuestos/ListaRepuesto'
import ModificarRepuesto from '../screens/repuestos/ModificarRepuesto'
import Reparacion from "../screens/reparacion/Reparacion";
import AltaReparacion from "../screens/reparacion/AltaReparacion";
import ListarReparacion from "../screens/reparacion/ListarReparacion";
import ModificarReparacion from "../screens/reparacion/ModificarReparacion";
import ReparacionRepuestos from "../screens/reparacion/ReparacionRepuestos";
import ReparacionAdd from "../screens/reparacion/ReparacionAdd";
import ReparacionDetalle from "../screens/reparacion/ReparacionDetalle";
//#endregion


const Routes = () => {

    return (
        <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                        title: "Home",
                        headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    
                    <Stack.Screen
                        name="Vehiculos"
                        component={Vehiculos}
                        options={{
                        title: "Vehiculos",
                        headerStyle: {
                            backgroundColor: "blue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="AltaVehiculo"
                        component={AltaVehiculo}
                        options={{
                        title: "Alta Vehiculo",
                        headerStyle: {
                            backgroundColor: "blue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ListarVehiculo"
                        component={ListarVehiculo}
                        options={{
                        title: "Lista de Vehiculos",
                        headerStyle: {
                            backgroundColor: "blue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />                    
                    <Stack.Screen
                        name="ModificarVehiculo"
                        component={ModificarVehiculo}
                        options={{
                        title: "Modificar Vehiculo",
                        headerStyle: {
                            backgroundColor: "blue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                 
                    <Stack.Screen
                        name="Usuarios"
                        component={Usuarios}
                        options={{
                        title: "Usuarios",
                        headerStyle: {
                            backgroundColor: "green",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="AltaUsuario"
                        component={AltaUsuario}
                        options={{
                        title: "Alta Usuario",
                        headerStyle: {
                            backgroundColor: "green",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ListarUsuario"
                        component={ListarUsuario}
                        options={{
                        title: "Lista de Usuarios",
                        headerStyle: {
                            backgroundColor: "green",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />                    
                    <Stack.Screen
                        name="ModificarUsuario"
                        component={ModificarUsuario}
                        options={{
                        title: "Modificar Usuario",
                        headerStyle: {
                            backgroundColor: "green",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
        
                    
                    <Stack.Screen
                        name="Insumos"
                        component={Insumos}
                        options={{
                        title: "Insumos",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="AltaInsumo"
                        component={AltaInsumo}
                        options={{
                        title: "Alta Insumo",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ListarInsumo"
                        component={ListarInsumo}
                        options={{
                        title: "Lista de Insumos",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />                    
                    <Stack.Screen
                        name="ModificarInsumo"
                        component={ModificarInsumo}
                        options={{
                        title: "Modificar Insumo",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />

                    <Stack.Screen
                        name="Repuestos"
                        component={Repuestos}
                        options={{
                        title: "Repuestos",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="AltaRepuesto"
                        component={AltaRepuesto}
                        options={{
                        title: "Alta Repuesto",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ListarRepuesto"
                        component={ListarRepuesto}
                        options={{
                        title: "Lista de Repuestos",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />                    
                    <Stack.Screen
                        name="ModificarRepuesto"
                        component={ModificarRepuesto}
                        options={{
                        title: "Modificar Repuesto",
                        headerStyle: {
                            backgroundColor: "pink",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />

                    <Stack.Screen
                        name="Reparacion"
                        component={Reparacion}
                        options={{
                        title: "Reparacion",
                        headerStyle: {
                            backgroundColor: "skyblue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="AltaReparacion"
                        component={AltaReparacion}
                        options={{
                        title: "Alta Reparacion",
                        headerStyle: {
                            backgroundColor: "skyblue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ListarReparacion"
                        component={ListarReparacion}
                        options={{
                        title: "Lista de Reparacion",
                        headerStyle: {
                            backgroundColor: "skyblue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ModificarReparacion"
                        component={ModificarReparacion}
                        options={{
                        title: "Modificar Reparacion",
                        headerStyle: {
                            backgroundColor: "skyblue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ReparacionRepuestos"
                        component={ReparacionRepuestos}
                        options={{
                        title: " Repuestos e Insumos",
                        headerStyle: {
                            backgroundColor: "skyblue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ReparacionAdd"
                        component={ReparacionAdd}
                        options={{
                        title: "Agregar insumos y repuestos",
                        headerStyle: {
                            backgroundColor: "skyblue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />
                    <Stack.Screen
                        name="ReparacionDetalle"
                        component={ReparacionDetalle}
                        options={{
                        title: "Detalle de reparacion",
                        headerStyle: {
                            backgroundColor: "skyblue",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        }}
                    />                                                                                                          
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;

