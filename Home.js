import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, TextInput, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Home({ navigation }) {
  //CONTROLAR ANIMACIONES BOTONES
  const [pressedPerson, setPressedPerson] = useState(false);
  const [pressedCalendar, setPressedCalendar] = useState(false);
  const [pressedList, setPressedList] = useState(false);

  const handlePressPerson = () => {
    setPressedPerson(true);
    setTimeout(() => setPressedPerson(false), 100);
  };

  const handlePressCalendar = () => {
    setPressedCalendar(true);
    setTimeout(() => setPressedCalendar(false), 100);
  };

  const handlePressList = () => {
    setPressedList(true);
    setTimeout(() => setPressedList(false), 100);
  };

  //JUNTAR ANIMACIONES Y REDIRECCIONAMIENTO DE PANTALLAS

  const ProfileButton = () => {
    handlePressPerson();
    navigation.navigate('Profile');
    console.log('Boton PULSADOO');
  };

  const CalendarButton = () => {
    handlePressCalendar();
    navigation.navigate('Calendar');
  };

  const ListButton = () => {
    handlePressList();
    navigation.navigate('List');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <Text style={styles.paragraph}>Home</Text>

        {/* BOTONES */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={ProfileButton} /*style={styles.backButton}*/
            style={[
              styles.button,
              pressedPerson ? (style = { transform: [{ scale: 1.15 }] }) : null,
            ]}>
            <Image source={require('./components/person.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={CalendarButton} /*style={styles.backButton}*/
            style={[
              styles.button,
              pressedCalendar
                ? (style = { transform: [{ scale: 1.15 }] })
                : null,
            ]}>
            <Image source={require('./components/calendar.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ListButton} /*style={styles.backButton}*/
            style={[
              styles.button,
              pressedList ? (style = { transform: [{ scale: 1.15 }] }) : null,
            ]}>
            <Image source={require('./components/checklist.png')} />
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginTop: '150%',
  },
  button: {
    margin: 30,
  },
});

export default Home;
