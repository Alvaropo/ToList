import { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';

function Search({ navigation }) {
  //VARIABLES USECONTEXT
  const { recipeName, setRecipeName } = useContext(PantallasContext);
  const { mealTypeFilter, setMealTypeFilter } = useContext(PantallasContext);
  const { dietType, setDietType } = useContext(PantallasContext);
  const { kcal, setKcal } = useContext(PantallasContext);
  const { ingredients, setIngredients } = useContext(PantallasContext);

  //VARIABLES LOCALES
  const [selectedButtonMealType, setSelectedButtonMealType] = useState('breakfast');
  const [selectedButtonDietType, setSelectedButtonDietType] = useState('balanced');
  const [kcalCounter, setKcalCounter] = useState(1000);
  const [ingredientsCounter, setIngredientsCounter] = useState(10);

  //BOTON BACK
  const [pressedBack, setPressedBack] = useState(false);

  const handlePressBack = () => {
    setPressedBack(true);
    setTimeout(() => setPressedBack(false), 100);
    navigation.navigate('Day');
  };
  //CONTROLAR ANIMACIONES BOTONES
  const [pressedSearch, setPressedSearch] = useState(false);

  const handlePressSearch = () => {
    setPressedSearch(true);
    setTimeout(() => setPressedSearch(false), 100);

    setMealTypeFilter(selectedButtonMealType);
    setDietType(selectedButtonDietType);
    setKcal(kcalCounter);
    setIngredients(ingredientsCounter);

    navigation.navigate('Recipes');
  };

  //CONTADORES KCAL Y INGREDIENTES
  const incrementKcal = () => {
    setKcalCounter(kcalCounter + 50);
    // setKcal(kcalCounter);
  };

  const decrementKcal = () => {
    if (kcalCounter > 50) {
      setKcalCounter(kcalCounter - 50);
    }
    //setKcal(kcalCounter);
  };

  const incrementIngredients = () => {
    setIngredientsCounter(ingredientsCounter + 1);
    // setIngredients(ingredientsCounter);
  };

  const decrementIngredients = () => {
    if (ingredientsCounter > 1) {
      setIngredientsCounter(ingredientsCounter - 1);
    }
    //setIngredients(ingredientsCounter);
  };

  //CONTROL DE BOTONES
  const handleButtonPressMeal = (button) => {
    setSelectedButtonMealType(button);
    //setMealType(button);
    console.log(button);
  };

  const handleButtonPressDiet = (button) => {
    setSelectedButtonDietType(button);
    //setDietType(button);
    console.log(button);
  };


  //PULSAR PARA INCREMENTAR AUTOMATICAMENTE AL DEJAR PRESIONADO UN BOTON +,-
  const intervalRef = useRef(null);

  const handleIncrementLongPress = () => {
    intervalRef.current = setInterval(() => {
      setKcalCounter((prevCount) => prevCount + 50);
    }, 100);
  };

  const handleDecrementLongPress = () => {
    intervalRef.current = setInterval(() => {
      setKcalCounter((prevCount) => prevCount - 50);
    }, 100);
  };

  const handleButtonRelease = () => {
    clearInterval(intervalRef.current);
  };


  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
        <ScrollView>
          {/* BOTON BACK */}
          <TouchableOpacity
            onPress={handlePressBack} /*style={styles.backButton}*/
            style={[
              styles.backButton,
              pressedBack ? (style = { transform: [{ scale: 1.2 }], marginTop: '12%', marginLeft: '11%', }) : null,]}>
            <Image
              source={require('./components/arrow_back.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <Text style={styles.paragraph}>Search</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Recipe Name"
            placeholderTextColor="white" onChangeText={text => setRecipeName(text)}
            value={setRecipeName}></TextInput>

          {/**CONTROLAR TIPO DE COMIDA ES DESAYUNO COMIDA O CENA */}
          <View style={styles.mealType}>
            <TouchableOpacity
              style={[
                styles.buttonMealType,
                selectedButtonMealType === 'breakfast'
                  ? null
                  : styles.opaqueButton,
              ]}
              onPress={() => handleButtonPressMeal('breakfast')}>
              <Text style={styles.buttonText}>Breakfast</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonMealType,
                selectedButtonMealType === 'lunch' ? null : styles.opaqueButton,
              ]}
              onPress={() => handleButtonPressMeal('lunch')}>
              <Text style={styles.buttonText}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonMealType,
                selectedButtonMealType === 'dinner' ? null : styles.opaqueButton,
              ]}
              onPress={() => handleButtonPressMeal('dinner')}>
              <Text style={styles.buttonText}>Dinner</Text>
            </TouchableOpacity>
          </View>

          {/**CONTROLAR TIPO DE DIETA DIET */}
          <View style={styles.dietType}>
            <TouchableOpacity
              style={[
                styles.buttonMealType,
                selectedButtonDietType === 'balanced'
                  ? null
                  : styles.opaqueButton,
              ]}
              onPress={() => handleButtonPressDiet('balanced')}>
              <Text style={styles.buttonText}>Balanced</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonMealType,
                selectedButtonDietType === 'low-carb' ? null : styles.opaqueButton,
              ]}
              onPress={() => handleButtonPressDiet('low-carb')}>
              <Text style={styles.buttonText}>Low-Carb</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonMealType,
                selectedButtonDietType === 'low-fat' ? null : styles.opaqueButton,
              ]}
              onPress={() => handleButtonPressDiet('low-fat')}>
              <Text style={styles.buttonText}>Low-Fat</Text>
            </TouchableOpacity>
          </View>
          <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2%',
              marginLeft: '2%',
              marginRight: '2%',
            }}>
            <TouchableOpacity
              style={[styles.buttonMealType, selectedButtonDietType === 'high-protein' ? null : styles.opaqueButton,]}
              onPress={() => handleButtonPressDiet('high-protein')}>
              <Text style={styles.buttonText}>High-Protein</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonMealType, selectedButtonDietType === 'high-fiber' ? null : styles.opaqueButton,]}
              onPress={() => handleButtonPressDiet('high-fiber')}>
              <Text style={styles.buttonText}>High-Fiber</Text>
            </TouchableOpacity>
          </View>

          {/**CONTROLES CANTIDAD DE KCALORIAS */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '10%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => decrementKcal()} onLongPress={handleDecrementLongPress}
              onPressOut={handleButtonRelease}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.kcal}>{kcalCounter} kcal</Text>

            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => incrementKcal()} onLongPress={handleIncrementLongPress}
              onPressOut={handleButtonRelease}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/**CONTROLES CANTIDAD DE INGREDIENTES */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => decrementIngredients()}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.kcal}>
              Ingredients {'\n'}
              {ingredientsCounter}
            </Text>

            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => incrementIngredients()}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* BOTONES */}

          <TouchableOpacity
            onPress={handlePressSearch}
            style={styles.button}>
            <Text style={styles.textButton}>SEARCH</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 44,
    marginLeft: 16,
  },
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
    marginBottom: 20,
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
    fontSize: 13,
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
  },
  buttonMealType: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    //height:'45%',
    width: '32%',

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
  buttonText: {
    textAlign: 'center',
    color: '#6E6E6E',
    fontSize: 15,
  },
  mealType: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '13%',
    marginTop: '8%',
    // paddingHorizontal:,
  },
  dietType: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  opaqueButton: {
    opacity: 0.5,
  },
  plusButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: '2%',
    paddingVertical: '0%',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '-20%',
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
  minusButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: '2.3%',
    paddingVertical: '0%',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: '-20%',

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
  kcal: {
    color: '#6E6E6E',
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: '6%',
    paddingVertical: '3%',
    paddingTop: '2%',
    paddingBottom: '1%',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    textAlign: 'center',
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
});

export default Search;
