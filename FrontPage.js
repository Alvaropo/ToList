import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function FrontPage({ navigation }) {
  //CONTROLAR ANIMACIONES BOTONES


  //JUNTAR ANIMACIONES Y REDIRECCIONAMIENTO DE PANTALLAS

  const LogInButton = () => {
    navigation.navigate('LogIn'); //navega a pantalla LogIn
  };

  const SignUpButton = () => {
    navigation.navigate('SignUp'); //navega a pantalla SignUp
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
      <View style={{backgroundColor:"transparent", alignItems:'center',paddingTop:'40%'}}>
        <Image source={require('./components/Untitled.png')} style={{ width: 200, height: 170 }}/>
        </View>
        <Text style={styles.paragraph}>ToList</Text>
        {/* BOTONES */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={LogInButton} /*AQUI SE PONE SIN Parentesis()*/
            style={styles.button}>
            <Text style={styles.textButton}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SignUpButton} /*AQUI SE PONE SIN Parentesis()*/
            style={styles.button}>
            <Text style={styles.textButton}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: 'linear-gradient(to bottom, #1E5B53, #CCFFAA)',
  },
  paragraph: {
    marginTop: 10,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 90,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginLeft: 90,
    marginRight: 90,
    marginTop: 20,
    //AÑADIR SOMBRA Y BORDE AL BOTON
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#b4b4b4',
  },
  buttonPressed: {
    transform: [{ scale: 1.05 }],
  },
  textButton: {
    color: '#6E6E6E',
    fontSize: 18,
  },
});

export default FrontPage;
