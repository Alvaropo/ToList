import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import PantallasContext from './PantallasContext';
import md5 from "react-native-md5";

function SignUp({ navigation }) {

  //VARIABLES USE CONTEXT
  const { user, setUser } = useContext(PantallasContext);
  const { email_context, setEmail_context } = useContext(PantallasContext);
  const { password_context, setPassword_context } = useContext(PantallasContext);

  //CAVIABLES LOCALES
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [textPassword, setTextPassword] = useState('');
  const [textPassword2, setTextPassword2] = useState('');

  const handlePressBack = () => {
    navigation.navigate('FrontPage'); //navega a pantalla SignUp
  };

  //OBTIENE LOS DATOS INTRODUCIDOS EN LSO TEXTINPUT Y LOS ESTABLECE A LAS VARIABLES
  const SignUpButton = () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || password2.trim() === '') {//trim para eliminar los espacios en blanco
      alert('Complete all text fields.');
    } else {
      handleCheckUsername().then((result) => {
        if (result) {
          if (password === password2) {
            handleInsert();
            handleCreateDataRecipes();
            handleCreateDataList();
            setUser(username);//establezco el usuario para despues poder usarlo en toda la aplicacion para identificar y importar sus datos y recetas
            setEmail_context(email);
            setPassword_context(password);
            navigation.navigate('Home');
          } else {
            alert('Passwords not match.');
          }

        }
      });
    }
  };

  //COMPRUEBA SI EXISTE UN USUARO O EMAIL CON EL QUE SE HA INTRODUCIDO
  const handleCheckUsername = () => {
    return axios({
      method: 'post',
      url: '',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '',
      },
      data: {
        collection: 'users',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        filter: {
          $or: [
            { email: email },
            { username: username }
          ]
        },
        limit: 1,
      },
    })
      .then((response) => {
        if (response.data.documents.length === 1) {
          alert('Username / Email exist.');
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //INSERTA Y CREA EL NUEVO USUARIO
  const handleInsert = () => {
    axios({
      method: 'post',
      url: '',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '',
      },
      data: {
        collection: 'users',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        document: {
          username: username,
          email: email,
          password: password
        }
      }
    })
      .then((response) => {
        alert('Nuevo usuario ' + username + ' creado.');
        console.log('Usuario insertado correctamente');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //CREA LA BASE DE DATOS RECIPES CORRESPONDIENTE AL USUARIO REGISTRADO
  const handleCreateDataRecipes = () => {
    axios({
      method: 'post',
      url: '',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '',
      },
      data: {
        collection: 'recipes',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        document: {
          user: username,
          calendar: {
            monday: {
              breakfast: "Add",
              lunch: "Add",
              dinner: "Add"
            },
            tuesday: {
              breakfast: "Add",
              lunch: "Add",
              dinner: "Add"
            },
            wednesday: {
              breakfast: "Add",
              lunch: "Add",
              dinner: "Add"
            },
            thursday: {
              breakfast: "Add",
              lunch: "Add",
              dinner: "Add"
            },
            friday: {
              breakfast: "Add",
              lunch: "Add",
              dinner: "Add"
            },
            saturday: {
              breakfast: "Add",
              lunch: "Add",
              dinner: "Add"
            },
            sunday: {
              breakfast: "Add",
              lunch: "Add",
              dinner: "Add"
            }
          }
        }
      }
    })
      .then((response) => {
        console.log(response.data.documents + 'Usuario insertado correctamente');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //CREA LA BASE DE DATOS LIST CORRESPONDIENTE AL USUARIO REGISTRADO
  const handleCreateDataList = () => {
    axios({
      method: 'post',
      url: '',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '',
      },
      data: {
        collection: 'list',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        document: {
          user: username,
          items: []
        }
      }
    })
      .then((response) => {
        console.log(response.data.documents + 'Usuario insertado correctamente');
        sendEmail();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <ScrollView>
          {/* BOTON BACK */}
          <TouchableOpacity
            onPress={handlePressBack}
            style={styles.backButton}>
            <Image
              source={require('./components/arrow_back.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <Text style={styles.paragraph}>Sign Up</Text>
          <Text style={styles.text}>USERNAME</Text>
          <TextInput style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
            value={username}></TextInput>
          <Text style={styles.text}>EMAIL</Text>
          <TextInput style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            value={email}></TextInput>
          <Text style={styles.text}>PASSWORD</Text>
          <TextInput style={styles.textInput}
            onChangeText={(text) => { setPassword(md5.hex_md5(text)); setTextPassword(text); }}
            secureTextEntry={true}></TextInput>
          <Text style={styles.text}>REPEAT PASSWORD</Text>
          <TextInput style={styles.textInput}
            onChangeText={(text) => { setPassword2(md5.hex_md5(text)); setTextPassword2(text) }}
            secureTextEntry={true}>
          </TextInput>
          {/* BOTONES */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={SignUpButton}
              style={styles.button}>
              <Text style={styles.textButton}>SIGN UP</Text>
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
  backButton: {
    marginTop: 44,
    marginLeft: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '2%',
    marginBottom: 20,
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

export default SignUp;
