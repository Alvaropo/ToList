import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';
import axios from 'axios';

function List({ navigation }) {

  //VARIABLES USE CONTEXT
  const { user, setUser } = useContext(PantallasContext);

  //VARIABLES LOCALES
  const [shoppingList, setShoppingList] = useState([]);

  const handleCheck = (index) => {
    const newList = [...shoppingList];
    newList[index].checked = !newList[index].checked;
    //console.log('BOOL '+newList[index].checked);
    setShoppingList(newList);
    handleUpdateList(index, newList[index].checked);
  };

  const handleDeleteCheck = () => {
    console.log('delete');
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
}

  const handleResponse = (response) => {//ESTA FUNCION SIRVE PARA ESPERAR LA RESPUESTA DE LA API Y DESPUES ASIGNARLAS
    if (response.data.documents.length === 1) {
      const obj = response.data.documents[0].items;
      setShoppingList(obj);//AÑADO LOS INGREDIENTES A shoppinglist en un objeto json
    }

  };
  const handleUpdateList = (index, bool) => {//PASO EL INDEX Y EL VALOR BOOL QUE INDICARA SI EL CHECK ES TRUE O FALSE y hace el update en la bd
    axios({
      method: 'post',
      url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-enpqw/endpoint/data/v1/action/updateOne',//many
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

  useEffect(() => {

   // const refresco = setInterval(() => {
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
        console.log('REFRESCO LISTA');
   // }, 10000);//SE REFRESCAN LOS LA LISTA DE INGREDIENTES CADA 1 SEGUNDOS
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <ScrollView>
          <Text style={styles.paragraph}>List</Text>
          <Text style={{marginTop: 60,fontSize: 20,textAlign: 'center',color: 'white',fontWeight: 'bold',}}>Total - {shoppingList.length}</Text>
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
              <Text style={{ textAlign: 'center', color: '#F24E29', fontWeight: 'bold', }} onPress={() => handleDeleteCheck()}>DELETE CHECKED</Text>
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
    //alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 0,
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
    marginTop: 60,
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
