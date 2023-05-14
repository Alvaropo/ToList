import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';
import axios from 'axios';

const days = [
  { name: 'monday' },
  { name: 'tuesday' },
  { name: 'wednesday' },
  { name: 'thursday' },
  { name: 'friday' },
  { name: 'saturday' },
  { name: 'sunday' },
];

function Calendar({ navigation }) {
  const [days_, setDays_] = useState([
    { day: "monday", breakfast: "Add", lunch: "Add", dinner: "Add" },
    { day: "tuesday", breakfast: "Add", lunch: "Add", dinner: "Add" },
    { day: "wednesday", breakfast: "Add", lunch: "Add", dinner: "Add" },
    { day: "thursday", breakfast: "Add", lunch: "Add", dinner: "Add" },
    { day: "friday", breakfast: "Add", lunch: "Add", dinner: "Add" },
    { day: "saturday", breakfast: "Add", lunch: "Add", dinner: "Add" },
    { day: "sunday", breakfast: "Add", lunch: "Add", dinner: "Add" },
  ]);

  //VARIABLES USE CONTEXT
  const { dayOfWeek, setDayOfWeek } = useContext(PantallasContext);
  const { user, setUser } = useContext(PantallasContext);
  const { mealType, setMealType } = useContext(PantallasContext);

  //OBTIENE LAS RECETAS DE LA BD Y LAS ESTABLECE EN LOS COMPONENTES MONDAY,TUESDAY ETC
  useEffect(() => {
    let obj = {};
    const refresco = setInterval(() => {
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
          if (obj !== null && obj !== undefined) {
            obj = response.data.documents[0];

            //ESTABLECE EL NOMBRE DE LAS RECETAS OBTENIDAS PREVIAMENTE CON AXIOS
            Object.entries(obj.calendar).forEach(([day, meals]) => {
              setDays_(prevDays => prevDays.map(item => {
                if (item.day === day) {
                  return {
                    ...item,
                    breakfast: meals.breakfast || item.breakfast,
                    lunch: meals.lunch || item.lunch,
                    dinner: meals.dinner || item.dinner,
                  };
                }
                return item;
              }));
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);//SE REFRESCAN LOS LA LISTA DE INGREDIENTES CADA 1 SEGUNDOS
    console.log("Calendar content Updated");
  }, [user, dayOfWeek]);

  const onSubmit = (index) => {
    setDayOfWeek(days[index].name);
    navigation.navigate('Day');
  };

  //CUANDO SE REALIZA UNA PULSACION LARGA ELIMINA EL CONTENIDO
  const handleLongPress = () => {
    Alert.alert(
      'DELETE',
      'Delete all the recipes?',
      [
        {
          text: 'DELETE',
          onPress: () => handleDelete(),
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

  //ELIMINA EL CONTENIDO (RECETAS) DE LA PANTALLA
  const handleDelete = () => {
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
            ['calendar.' + dayOfWeek + '.breakfast']: 'Add',
            ['calendar.' + dayOfWeek + '.lunch']: 'Add',
            ['calendar.' + dayOfWeek + '.dinner']: 'Add'
          }
        }
      }
    })
      .then((response) => {
        if (response.data.matchedCount > 0) {
          alert('Recipes deleted.');
          console.log(response.data);
        } else {
          alert('Error on delete.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <ScrollView>
          <Text style={styles.paragraph}>Calendar</Text>
          {/*RECORRE LA CONST DAYS PARA CREAR LOS DIFERENTES COMPONENTES DE CADA UNO DE LOS DIAS QUE HAY ESTABLECIDOS */}
          {days.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => onSubmit(index)} onLongPress={handleLongPress}>
              <View style={styles.pill}>
                {/*ESTABLECE LOS COLORES (RINGS) DEPENDIENDO SI HAY UNAN RECETA ESTABLECIDA O NO */}
                <View
                  style={[
                    styles.orangeRing,
                    { borderColor: days_[index].breakfast != "Add" ? 'orange' : 'white' },
                  ]}>
                  <View
                    style={[
                      styles.greenRing,
                      { borderColor: days_[index].lunch != "Add" ? '#7BC640' : 'white' },
                    ]}>
                    <View
                      style={[
                        styles.blueRing,
                        { borderColor: days_[index].dinner != "Add" ? '#36ABDB' : 'white' },
                      ]}>
                      <Text style={styles.text}>{item.name.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
          )}
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
    marginBottom: '20%',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'white',
  },
  text: {
    fontSize: 30,
    color: 'grey',
  },
  pill: {
    backgroundColor: '#FFF',
    borderRadius: 65,
    alignItems: 'center',
    marginLeft: '8%',
    marginRight: '8%',
    marginBottom: '10%',
    paddingTop: '3%',
    paddingBottom: '3%',
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
  orangeRing: {
    width: '92%',
    height: 100,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenRing: {
    width: '92%',
    height: 75,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#7BC640',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueRing: {
    width: '92%',
    height: 50,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#36ABDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Calendar;
