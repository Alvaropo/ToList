import React, { useState,useContext,useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import PantallasContext from './PantallasContext';

function LogIn({ navigation }) {

  //VARIABLES USE CONTEXT
  const { user, setUser } = useContext(PantallasContext);
  const {email_context, setEmail_context} = useContext(PantallasContext);
  const {password_context, setPassword_context} = useContext(PantallasContext);

  //VARIABLES LOCALES
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
 
  const [password, setPassword] = useState('');

  //METODOS

  
  
  const handlePressBack = () => {
    navigation.navigate('FrontPage'); //navega a pantalla SignUp
  };
  const LogInButton = () => {
    handleLogin();
  };


//CODIGO DE AXIOS
  const handleLogin = () => {
    axios({
      method: 'post',
      url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-enpqw/endpoint/data/v1/action/find',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'JYIVV7JXuoEuQfgVaHsVkpLx7Lc5moChIBoldhTVuFZjK5nSZiD6ahlyuS1411Lw',
      },
      data: {
        collection: 'users',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        filter: {$or: [ //EL OR ME PERMITE INICIAR SESION TANTO CON EMAIL O CON EL USERNAME
          { email: email }, 
          { username: username } 
        ],
        password: password },
        limit: 1,
      },
    })
      .then((response) => {
        if (response.data.documents.length === 1) {
         // alert('Usuario encontrado');
         // console.log(response.data.documents);
         setUser(username);
        // setEmail_context(email);
         setPassword_context(password);

          navigation.navigate('Home');
        } else {
          alert('Email or Password INCORRECT.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
      <ScrollView>
        {/* ↓ ↓ ↓ BOTON BACK ↓ ↓ ↓ */}
        <TouchableOpacity
          onPress={handlePressBack} /*style={styles.backButton}*/
          style={styles.backButton}>
          <Image
            source={require('./components/arrow_back.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        {/* ⇑⇑⇑⇑BOTON BACK ⇑⇑⇑ */}
        <Text style={styles.paragraph}>Login</Text>
        <Text style={styles.text}> USERNAME</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => setUsername(text)}
        ></TextInput>
        <Text style={styles.text}>PASSWORD</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => setPassword(text)}
        value={password} secureTextEntry={true}></TextInput>

        {/* BOTONES */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={LogInButton}
            style={styles.button}>
            <Text style={styles.textButton}>LOGIN</Text>
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
    // paddingTop: 44,
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
  backButton: {
    marginTop: 44,
    marginLeft: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 90,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginLeft: 90,
    marginRight: 90,
    marginTop: '20%',
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

export default LogIn;
