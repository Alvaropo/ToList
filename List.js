import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';
import axios from 'axios';

function List({ navigation }) {

  //VARIABLES USE CONTEXT
  const { user, setUser } = useContext(PantallasContext);
  const { contador, setContador } = useContext(PantallasContext);

  //VARIABLES LOCALES
  const [shoppingList, setShoppingList] = useState([]);

  const handleCheck = (index) => {
    const newList = [...shoppingList];
    newList[index].checked = !newList[index].checked;
    setShoppingList(newList);
    handleUpdateList(index, newList[index].checked);
  };

  //ELIMINA LOS ELEMENTOS MARCADOS EN CHECK DE LA LISTA
  const handleDeleteCheck = () => {
    console.log('Delete Checked');
    axios({
      method: 'post',
      url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-enpqw/endpoint/data/v1/action/updateMany',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'JYIVV7JXuoEuQfgVaHsVkpLx7Lc5moChIBoldhTVuFZjK5nSZiD6ahlyuS1411Lw',
      },
      data: {
        collection: 'list',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        filter: { user: user },
        update: {
          $pull: {
            items: { checked: true }
          }
        }
      },
    })
      .then((response) => {
        if (response.data.modified > 0) {
          alert('Checked items deleted.');
        } else {
          alert('Checked items deleted.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
      setContador(contador+1);
  }

  //ESTA FUNCION SIRVE PARA ESPERAR LA RESPUESTA DE LA API Y DESPUES ASIGNARLAS
  const handleResponse = (response) => {
    if (response.data.documents.length === 1) {
      const obj = response.data.documents[0].items;
      setShoppingList(obj);//AÑADO LOS INGREDIENTES A shoppinglist EN UN OBJETO JSON
    }

  };

  //PASO EL INDEX Y EL VALOR BOOL QUE INDICARA SI EL CHECK ES TRUE O FALSE Y HACE EL UPDATE A LA BD
  const handleUpdateList = (index, bool) => {
    axios({
      method: 'post',
      url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-enpqw/endpoint/data/v1/action/updateOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'JYIVV7JXuoEuQfgVaHsVkpLx7Lc5moChIBoldhTVuFZjK5nSZiD6ahlyuS1411Lw',
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
            ['items.' + index + '.checked']: bool,
          }
        }
      }
    })
      .then((response) => {
        if (response.data.matchedCount > 0) {
          console.log('Datos List check actualizados');
        } else {
          console.log('No se encontraron documentos para actualizar');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //OBTIENE LA LISTA DE INGREDIENTES CORRESPONDIENTE AL USUARIO
  useEffect(() => {
      axios({
        method: 'post',
        url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-enpqw/endpoint/data/v1/action/find',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': 'JYIVV7JXuoEuQfgVaHsVkpLx7Lc5moChIBoldhTVuFZjK5nSZiD6ahlyuS1411Lw',
        },
        data: {
          collection: 'list',
          database: 'ToListDB',
          dataSource: 'ToListCluster',
          filter: { user: user },
          limit: 1,
        },
      })
        .then((response) => {
          handleResponse(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log('List content Updated');
  }, [contador]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <ScrollView>
          <Text style={styles.paragraph}>List</Text>
          <Text style={{
            marginTop: 60,
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}>Total - {shoppingList.length}</Text>
          <View style={styles.list}>
            {shoppingList.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleCheck(index)}>
                <View style={styles.item}>
                  <Text style={item.checked ? styles.checkedText : styles.text}>
                    {item.name}
                  </Text>
                  <CheckBox
                    checked={item.checked}
                    onPress={() => handleCheck(index)}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity>
            <View style={styles.delete}>
              <Text style={{
                textAlign: 'center',
                color: '#F24E29',
                fontWeight: 'bold',
              }}
                onPress={() => handleDeleteCheck()}>DELETE CHECKED</Text>
            </View>
          </TouchableOpacity>
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
  list: {
    backgroundColor: '#FFF',
    borderRadius: 55,
    paddingHorizontal: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 10,
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
  delete: {
    backgroundColor: '#FFF',
    borderRadius: 55,
    paddingHorizontal: 20,
    marginLeft: 115,
    marginRight: 115,
    marginTop: 5,
    marginBottom: 30,
    paddingTop: 20,
    paddingBottom: 20,
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

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: -8,
    justifyContent: 'space-between',
  },
  paragraph: {
    marginTop: '15%',
    marginBottom: '-6%',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'white',
  },
  text: {
    fontSize: 20,
  },
  checkedText: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    opacity: 0.45,
  },
});

export default List;
