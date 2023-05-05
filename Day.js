import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, Alert,ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';
import axios from 'axios';



//LOS BOTONES NO ESTAN BIEN
function Day({ navigation }) {

  //VARIABLES USE


  //const [objInfo, setObjInfo] = useState(null);
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  const { dayOfWeek, mealType, setMealType, user } = useContext(PantallasContext);

  const handleResponse = (response) => {//ESTA FUNCION SIRVE PARA ESPERAR LA RESPUESTA DE LA API Y DESPUES ASIGNARLAS
    if (response.data.documents.length === 1) {
      //alert('Info encontrada');
      const obj = response.data.documents[0];
      setBreakfast(obj.calendar[dayOfWeek].breakfast);
      setLunch(obj.calendar[dayOfWeek].lunch);
      setDinner(obj.calendar[dayOfWeek].dinner);


    }
  };

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
        collection: 'recipes',
        database: 'ToListDB',
        dataSource: 'ToListCluster',
        filter: { user: user },
        limit: 1,
      },
    })
      .then((response) => {
        // setObjInfo(JSON.stringify(response.data.documents[0]));
        handleResponse(response);
        //console.log('RESPONSE '+JSON.stringify(response))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, dayOfWeek]);

  const handlePressButtonBreakfast = () => {
    setMealType('breakfast');
    navigation.navigate('Search');
    
  };

  const handlePressBack = () => {
    navigation.navigate('Calendar');
  };

  const handlePressButtonLunch = () => {
    setMealType('lunch');
    navigation.navigate('Search');
  
  };

  const handlePressButtonDinner = () => {
    setMealType('dinner');
    navigation.navigate('Search');

  };
  const handleLongPress = (type) => {
    Alert.alert(
      'DELETE',
      'Delete all the recipes?',
      [
        {
          text: 'DELETE',
          onPress: () => handleDelete(type),
        },
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  const handleDelete = (type) => {
    console.log('Delete');
    axios({
      method: 'post',
      url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-enpqw/endpoint/data/v1/action/updateOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'JYIVV7JXuoEuQfgVaHsVkpLx7Lc5moChIBoldhTVuFZjK5nSZiD6ahlyuS1411Lw',
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
            ['calendar.'+dayOfWeek+'.'+type]: 'Add',
          }
        }
      }
    })
    .then((response) => {
      if (response.data.matchedCount > 0) {
        alert('Recipe deleted.');
        console.log(response.data);
        // Actualiza el estado correspondiente a null antes de tener que volver a acceder a la bd
        if (type === 'breakfast') {
          setBreakfast('Add');
        } else if (type === 'lunch') {
          setLunch('Add');
        } else if (type === 'dinner') {
          setDinner('Add');
        }
      } else {
        alert('Error on delete.');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };


  const addrecipe = (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.pill}>
        <TouchableWithoutFeedback onPress={handlePressButtonBreakfast} onLongPress={() => handleLongPress('breakfast')}>
          <View style={[styles.button, { borderColor: breakfast !== "Add" ? 'orange' : 'white' }]}
          //days[index].orange = false;
          >
            <Text style={styles.textButton}>{breakfast}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handlePressButtonLunch} onLongPress={() => handleLongPress('lunch')}>
        <View
          style={[styles.button, { borderColor: lunch !== "Add" ? '#7BC640' : 'white' }]}
        //days[index].green = false;
        >
          <Text style={styles.textButton}>{lunch}</Text>
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handlePressButtonDinner} onLongPress={() => handleLongPress('dinner')}>
        <View
          style={[styles.button, { borderColor: dinner !== "Add" ? '#36ABDB' : 'white' }]}
        //days[dayOfWeek].blue = false;
        >
          <Text style={styles.textButton}>{dinner}</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
      <ScrollView>
        {/* BOTON BACK */}
        <TouchableOpacity
          onPress={handlePressBack} /*style={styles.backButton}*/
          style={styles.backButton}>
          <Image
            source={require('./components/arrow_back.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <Text style={styles.paragraph}>{dayOfWeek.toUpperCase()}</Text>

        {addrecipe}
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
  backButton: {
    marginTop: 44,
    marginLeft: 16,
  },
  pill: {
    backgroundColor: '#FFF',
    marginLeft: '0%',
    marginRight: '0%',
    width: '80%',
    height: 520,
    borderRadius: 160,
    alignItems: 'center',
    marginBottom:'10%',

    //width: windowWidth * 0.5
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

  paragraph: {
    marginTop: '5%',
    marginBottom: '10%',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'white',
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    //marginLeft: 90,
    //marginRight: 90,
    marginTop: '28%',
    //AÑADIR SOMBRA Y BORDE AL BOTON
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 4,
    borderColor: 'white',
  },
});

export default Day;
