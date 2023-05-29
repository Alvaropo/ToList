import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';
import axios from 'axios';
import md5 from "react-native-md5";

function Profile({ navigation }) {
  //VARIABLES USE CONTEXT
  const { user, setUser } = useContext(PantallasContext);
  const { email_context, setEmail_context } = useContext(PantallasContext);
  const { password_context, setPassword_context } = useContext(PantallasContext);

  //VARIABLES LOCALES
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [textPassword, setTextPassword] = useState('');
  const [textPassword2, setTextPassword2] = useState('');

  //OBTIENE DATOS DEL USUARIO PARA MOSTRARLOS EN LA PANTALLA PROFILE
  useEffect(() => {
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
        filter: { username: user },
        limit: 1,
      },
    })
      .then((response) => {
        const obj = response.data.documents[0];
        setEmail(obj.email);
        setUsername(obj.username);
        setPassword(obj.password);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //ESTABLECE LOS DATOS A LAS VARIABLES SI HAN SIDO MODIFICADOS
  const handlePressUpdate = () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || password2.trim() === '') {//trim para eliminar los espacios en blanco
      alert('Complete all text fields.');
    } else if (user != username && email_context != email) {
      handleCheckUsername().then((result) => {
        if (result) {
          if (password === password2) {
            setUser(username);//establezco el usuario para despues poder usarlo en toda la aplicacion para identificar y importar sus datos y recetas como identificador
            setEmail_context(email);
            setPassword_context(password);
            handleUpdateUser();
            alert('Profile Updated.');
          } else {
            alert('Passwords not match.');
          }
        }
      });
    } else {
      if (password === password2) {
        setUser(username);//establezco el usuario para despues poder usarlo en toda la aplicacion para identificar y importar sus datos y recetas como identificador
        setEmail_context(email);
        setPassword_context(password);
        handleUpdateUser();
        alert('Profile Updated.');
      } else {
        alert('Passwords not match.');
      }
    }
  };

  //ACTUALIZA LOS DATOS ESTABLECIDOS
  const handleUpdateUser = () => {
    axios({
      method: 'post',
      url: '',
      headers: {
        'Content-Type': 'application/json',
        'api-key': ''
      },
      data: {
        collection: 'users',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        filter: {
          username: user
        },
        update: {
          $set: {
            username: username,
            email: email,
            password: password
          }
        }
      }
    }).then((response) => {
      //console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
    //AL MODIFICAR EL NOMBRE DE USUARIO TENGO QUE MODIFICARLO TAMBIEN EN LAS TABLAS CORRESPONDIENTES AL MISMO
    axios({
      method: 'post',
      url: '',
      headers: {
        'Content-Type': 'application/json',
        'api-key': ''
      },
      data: {
        collection: 'recipes',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        filter: {
          user: user
        },
        update: {
          $set: {
            user: username,
          }
        }
      }
    }).then((response) => {
     // console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });

    axios({
      method: 'post',
      url: '',
      headers: {
        'Content-Type': 'application/json',
        'api-key': ''
      },
      data: {
        collection: 'list',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        filter: {
          user: user
        },
        update: {
          $set: {
            user: username
          }
        }
      }
    }).then((response) => {
      //console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  //COMPRUEBA SI EL USUARO O EMAIL SON EXISTENTES CON EL INTRODUCIDO
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

  const handlePressLogout = () => {
    navigation.navigate('FrontPage');
    console.log('Logout');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <ScrollView>
          <Text style={styles.paragraph}>Profile</Text>
          <Text style={styles.text}>USERNAME</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => setUsername(text)} defaultValue={user}></TextInput>
          <Text style={styles.text}>EMAIL</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => setEmail(text)} defaultValue={email}></TextInput>
          <Text style={styles.text}>PASSWORD</Text>
          <TextInput style={styles.textInput} secureTextEntry={true}
            onChangeText={(text) => { setTextPassword(text); setPassword(md5.hex_md5(text)) }}></TextInput>
          <Text style={styles.text}>REPEAT PASSWORD</Text>
          <TextInput style={styles.textInput} secureTextEntry={true}
            onChangeText={(text) => { setTextPassword2(text); setPassword2(md5.hex_md5(text)) }} ></TextInput>
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
    marginTop: '15%',
    marginBottom: '14%',
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
