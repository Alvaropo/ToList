import { View, StyleSheet, Text, TouchableOpacity, Image, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Home({ navigation }) {
  const ProfileButton = () => {
    handlePressPerson();
    navigation.navigate('Profile');
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
        {/* BOTONES DEL NAVIGATION TAB */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={ProfileButton}
            style={styles.button}>
            <Image source={require('./components/person.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={CalendarButton}
            style={styles.button}>
            <Image source={require('./components/calendar.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ListButton}
            style={styles.button}>
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
