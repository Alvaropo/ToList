import {createContext, useState} from "react";


const PantallasContext = createContext();

export const PantallasProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [email_context, setEmail_context] = useState("");
    const [password_context, setPassword_context] = useState("");
    const [password2_context, setPassword2_context] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [mealType, setMealType] = useState("");


    const [mealTypeFilter, setMealTypeFilter] = useState("");
    const [recipeName, setRecipeName] = useState("Add");
    const [dietType, setDietType] = useState("");
    const [kcal, setKcal] = useState("");
    const [ingredients, setIngredients] = useState("");

    return (
        <PantallasContext.Provider 
        value ={{ 
            user, setUser,
            email_context, setEmail_context,
            password_context, setPassword_context,
            password2_context, setPassword2_context,
            dayOfWeek, setDayOfWeek, 
            mealType, setMealType,
            recipeName, setRecipeName,
            mealTypeFilter, setMealTypeFilter,
            dietType, setDietType,
            kcal, setKcal,
            ingredients, setIngredients
            }}>
            {children}
        </PantallasContext.Provider>
    )
}

export default PantallasContext;