import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

function FrontPage({ navigation }) {
  //FUENTE LOBSTER REGULAR
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lobster-Regular': require('./assets/Lobster-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  //REDIRECCIONAMIENTO DE PANTALLAS
  const LogInButton = () => {
    navigation.navigate('LogIn');
  };

  const SignUpButton = () => {
    navigation.navigate('SignUp');
  };

  //EVITAR ERROR DE RENDERIZAR LA PANTALLA ANTES DE CARGAR LA FUNETE DE TEXTO
  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <ImageBackground
          source={require('./components/Verduras.png')}
          resizeMode="cover"
          style={styles.container}
        >
          <View style={{ backgroundColor: "transparent", alignItems: 'center', paddingTop: '40%' }}>
          </View>
          <Text style={styles.paragraph}>ToList</Text>
          {/* BOTONES */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={LogInButton}
              style={styles.button}>
              <Text style={styles.textButton}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={SignUpButton}
              style={styles.button}>
              <Text style={styles.textButton}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
    fontFamily: 'Lobster-Regular',
    marginTop: 10,
    fontSize: 120,
    textAlign: 'center',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'white',
    textShadowColor: '#5B4D4D',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
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
