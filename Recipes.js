import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Linking, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PantallasContext from './PantallasContext';
import axios from 'axios';

function Recipes({ navigation }) {

   const regex = /(tbsp|tsp|glass|can|ounces|cups|cup|tablespoons|spoon|spoons|tea|tablespoon|teaspoon|g|cann|and|can|grams|\d+\s*g)&&[\d.,\/#!$%\^&\*;:{}=\-_`~()]+\b|(?:\b(?:(?:\d+\s*g(?!\w))|(?:\d*\.\d+\s*g(?!\w))|(?:\d+\s*\/\s*2|\u00BD|\d+\s*\/\s*4|\d+\s*\/\s*8|\d+\s*\/\s*3)|(?:\d+\s*ounces(?!\w))|(?:\d+\s*cups?(?!\w))|(?:\d+\s*tbsp?(?!\w))|(?:\d+\s*cup?(?!\w))|(?:\d+\s*tablespoons?(?!\w))|(?:\d+\s*(?:table|tea)?spoons?(?!\w))||(?:tablespoons?|teaspoons?|tablespoon?|teaspoon?|ounces?|cup?|cups?|g?|tbsp?|tsp?)|(?:\d+\s*(?:table|tea)?spoon?(?!\w))|(?:g(?!\w))|(?:grams(?!\w)))\b)|[^\w\s]/gi;

   //const regex = /(tbsp|tsp|glass|can|ounces|cups|cup|tablespoons|spoon|spoons|tea|tablespoon|teaspoon|g|cann|can|grams|\d+\s*g)/gi;
   //const regex = texto.replace(regex_, "");
   //esto es para recortar el string de ingredientes
    // const result = ingredient.substring(0, 28).replace(regex, "");

    //PANTALLA DE CARGA
    const fadeAnim = useRef(new Animated.Value(1)).current;

    //VARIABLES USECONTEXT
    const { recipeName, setRecipeName } = useContext(PantallasContext);
    const { dayOfWeek, mealType, user, dietType, kcal, ingredients, mealTypeFilter } = useContext(PantallasContext);

    //VARIABLES LOCALES
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://api.edamam.com/api/recipes/v2?type=public&q=' + recipeName + '&mealType=' + mealType + '&diet=' + dietType + '&calories=100-' + kcal + '&ingr=' + ingredients + '&app_id=98348007&app_key=77dff19f89b5d5a9347461da760c4e6c');
                setRecipes(response.data.hits.slice(0, 20)); // Se limita a un máximo de 20 recetas
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, []);
    console.log('https://api.edamam.com/api/recipes/v2?type=public&q=' + recipeName + '&mealType=' + mealType + '&diet=' + dietType + '&calories=100-' + kcal + '&ingr=' + ingredients + '&app_id=98348007&app_key=77dff19f89b5d5a9347461da760c4e6c');
    console.log('RECIPENAME ' + recipeName);
    console.log('MEALTYPE ' + mealType);
    console.log('DIETTYPE ' + dietType);
    console.log('KCALO ' + kcal);
    console.log('INGREDIENTS ' + ingredients);
    if (isLoading) {
        return <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: fadeAnim }}>
            <ActivityIndicator size="large" color="green" />
            <Text>Cargando...</Text>
        </Animated.View>;
    }
    if (error) {
        return <Text style={{ marginTop: '80%', textAlign: 'center', fontSize: 15 }}>Error: {error.message}</Text>;
    }

    const handlePressBack = () => {
        navigation.navigate('Search');
    };

    const handlePressAddRecipes = (label) => {
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
                        ['calendar.' + dayOfWeek + '.' + mealType]: label
                    }
                }
            }
        })
            .then((response) => {
                if (response.data.matchedCount > 0) {
                    //  alert('Recetita añadidita.');
                    console.log('DayofWeek ' + dayOfWeek);
                    console.log('MealType ' + mealType);
                    console.log('MealTypeFilter ' + mealTypeFilter);
                    console.log('Label ' + label);
                    console.log(JSON.stringify(response.data));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handlePressAddList = (ingredientsString) => {

        const ingredientsList = ingredientsString.split('\n');

        // Eliminar elementos vacíos de la lista de ingredientes
        const filteredIngredientsList = ingredientsList.filter((ingredient) => ingredient !== '');
        const items = filteredIngredientsList.map((ingredient) => ({ name: ingredient, checked: false }));
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
                    $addToSet: {//agrega elementos a un array solo si no están ya presentes en el array. Si los elementos ya existen, $addToSet no hace nada.
                        items: {
                            $each: filteredIngredientsList.map((ingredient) => ({ name: ingredient.substring(0, 27).replace(regex, "").trim(), checked: false }))
                        }
                    }
                }
            }
        })
            .then((response) => {
                if (response.data.matchedCount > 0) {
                    alert('Receta añadida.');
                    console.log(response.data);
                } else {
                    alert('No se ha podido añadir.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('INGREDIENTES String ' + ingredientsString);
        navigation.navigate('Calendar')
    };

    const recipeList = recipes.map((recipe, index) => {
        const { url, label, image, ingredientLines, calories } = recipe.recipe;

        //PARA AJUSTAR EL SALTO DE LINEA DE CADA INGRECIENTE DE LA RECETA SELECCIONADA
        const ingredientsList = Array.isArray(ingredientLines) ? ingredientLines.map(ingredient => `${ingredient}`) : [];
        const ingredientsString = ingredientsList.join('\n');
        return (
            <View key={index} style={styles.list}>
                <Text style={styles.title}>{label}</Text>
                <View style={styles.imagenIngredientes}>
                    <TouchableOpacity onPress={() => Linking.openURL(url)}>
                        <View>
                            <Image source={{ uri: image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.infoText}>Kcal: {calories.toFixed(0)}</Text>
                                <Text style={styles.infoText}>Ingredients: {ingredientLines.length}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.text}>
                            {ingredientsString}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { handlePressAddRecipes(label); handlePressAddList(ingredientsString); }} style={styles.buttonAdd}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>ADD</Text>
                </TouchableOpacity>
            </View>
        );
    });
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1E5B53', '#CCFFAA']} style={styles.container}>
                <ScrollView>
                    {/* BOTON BACK */}
                    <TouchableOpacity
                        onPress={handlePressBack}
                        style={styles.backButton}>
                        <Image source={require('./components/arrow_back.png')} style={{ width: 50, height: 50, }} />
                    </TouchableOpacity>
                    <Text style={styles.paragraph}>Recipes</Text>
                    {recipeList}
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

        flexDirection: 'column',
        backgroundColor: '#FFF',
        borderRadius: 65,
        paddingHorizontal: '3%',
        paddingVertical: '1%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '0%',
        marginBottom: '5%',
        paddingTop: '3%',
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
    title: {

        textAlign: 'center',
        fontSize: 25,
        marginBottom: '3%',
    },
    image: {
        width: 320,
        height: 250,
        marginLeft: 0,
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'grey',
    },
    text: {
        textAlign: 'left',
        backgroundColor: '#FFF',
        marginLeft: '5%',
        marginRight: '5%',
        paddingTop: 10,
    },
    imagenIngredientes: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'column',
        padding: '0%',
        marginRight: '0%',
        marginLeft: '0%',
    },
    buttonAdd: {
        backgroundColor: '#FFF',
        borderRadius: 55,
        marginTop: '3%',
        marginBottom: '5%',
        marginLeft: '30%',
        marginRight: '30%',
        paddingLeft: '3%',
        paddingRight: '3%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: 'grey',
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
    backButton: {
        marginTop: '12%',
        marginLeft: '3%',
    },
    info: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: '3%',
        marginLeft: '5%',
        position: 'absolute',
        borderRadius: 15,
        borderWidth: 1

    },
    infoText: {
        marginLeft: '5%',
        textAlign: 'center'
    }
});

export default Recipes;
