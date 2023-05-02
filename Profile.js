import React, { useState, useContext } from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Button,Image,TextInput,ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';





function Profile({ navigation }) {


  //VARIABLES USE CONTEXT
const { user, setUser } = useContext(PantallasContext);
const {email_context, setEmail_context} = useContext(PantallasContext);
const {password_context, setPassword_context} = useContext(PantallasContext);

  //CONTROLAR ANIMACIONES BOTONES



  const handlePressUpdate = () => {
 

  };

  const handlePressLogout = () => {
    navigation.navigate('FrontPage');
    console.log('logout');
  };

  //

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
      <ScrollView>
          <Text style={styles.paragraph}>Profile</Text>
          <Text style={styles.text}>USERNAME</Text>
          <TextInput style={styles.textInput} value={user}></TextInput>
          <Text style={styles.text}>EMAIL</Text>
          <TextInput style={styles.textInput}value={email_context}></TextInput>
          <Text style={styles.text}>PASSWORD</Text>
          <TextInput style={styles.textInput} secureTextEntry={true}value={password_context} ></TextInput>
          <Text style={styles.text}>REPEAT PASSWORD</Text>
          <TextInput style={styles.textInput}></TextInput>

          {/* BOTONES */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handlePressUpdate}
              style={styles.button}>
              <Text style={styles.textButton}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePressLogout} 
              style={styles.button}>
              <Text style={styles.textButton}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
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
    marginTop: '10%',
    marginBottom: '10%',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'white',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: '2%',
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
  text: {
    color: 'white',
    marginLeft: '10%',
    marginRight: '10%',
  },
  textInput: {
    backgroundColor: 'transparent',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '5%',
    marginTop: 4,
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 3,
    color: 'white',
    forntSize: '30%',
  },
});

export default Profile;
