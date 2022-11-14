import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState, useReducer } from "react";
import Input from "../../components/Input";
import { useAppDispatch } from "../../redux";
import { COLORS } from "../../constants";
import { Button } from "../../components";
import Logotype from "../../../assets/img/logotype.png";
import { useLoginMutation } from "../../services/authApi";
import { setUser } from "../../redux/slices/userSlice";

type Field = {
  value: string;
  error: string;
  touched: boolean;
  hasError: boolean;
};

type FormState = {
  fields: {
    email: Field;
    password: Field;
  };
  formIsValid: boolean;
};

const initialState: FormState = {
  fields: {
    email: { value: "", error: "", touched: false, hasError: true },
    password: { value: "", error: "", touched: false, hasError: true },
  },
  formIsValid: false,
};

type FormAction =
  | {
      type: "UPDATED_FORM";
      payload: {
        name: "email" | "password";
        value: string;
        error: string;
        touched: boolean;
        hasError: boolean;
        formIsValid: boolean;
      };
    }
  | {
      type: "TOUCH_FORM";
      payload: {
        name: "email" | "password";
      };
    };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATED_FORM":
      const { name, value, error, touched, hasError, formIsValid } =
        action.payload;
      return {
        ...state,
        formIsValid,
        fields: {
          ...state.fields,
          [name]: {
            ...state.fields[name],
            value,
            error,
            touched,
            hasError,
          },
        },
      };
    case "TOUCH_FORM":
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.name]: {
            ...state.fields[action.payload.name],
            touched: true,
          },
        },
      };
    default:
      return state;
  }
};

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const [formState, formDispatch] = useReducer(formReducer, initialState);
  const messageAction = isLogin ? "Ingresar" : "Registrarse";
  const [login, { isLoading }] = useLoginMutation({
    selectFromResult: ({ data, isError, isLoading }) => {
      if (isError) {
        Alert.alert("Error", "Ocurrió un error al iniciar sesión");
      }
      if (data) {
        dispatch(setUser(data));
      }
      return { data, isError, isLoading };
    },
  });
  const onHandleSubmit = () => {
    if (formState.formIsValid) {
      login({
        email: formState.fields.email.value,
        password: formState.fields.password.value,
      });
      console.log("Login");
    } else {
      Alert.alert("Formulario Inválido", "Ingresa email y contraseña válida", [
        { text: "OK" },
      ]);
    }
  };

  const formatEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const minPasswordLength = 6;

  const validateInput = (name: "email" | "password", value: string) => {
    let hasError = false;
    let error = "";
    switch (name) {
      case "email":
        if (value?.trim() === "") {
          hasError = true;
          error = `el ${name} es requerido`;
        } else if (!formatEmail.test(value)) {
          hasError = true;
          error = "el email no es valido";
        } else {
          hasError = false;
          error = "";
        }
        break;
      case "password":
        if (value?.trim() === "") {
          hasError = true;
          error = `el ${name} es requerido`;
        } else if (value?.length < minPasswordLength) {
          console.log("Entro");
          hasError = true;
          error = `la contraseña debe tener al menos ${minPasswordLength} caracteres`;
        } else {
          console.log("Tambien entro");
          hasError = false;
          error = "";
        }
        break;
      default:
        break;
    }
    return { hasError, error };
  };

  const onHandleChange = (name: "email" | "password", value: string) => {
    const { hasError, error } = validateInput(name, value);

    let formIsValid = true;

    for (const key in formState.fields) {
      const item = formState.fields[key as keyof typeof formState.fields];
      if (key === name && hasError) {
        formIsValid = false;
        break;
      } else if (key !== name && item.hasError) {
        formIsValid = false;
        break;
      }
    }

    formDispatch({
      type: "UPDATED_FORM",
      payload: {
        name,
        value,
        hasError,
        error,
        touched: false,
        formIsValid,
      },
    });
  };

  const onHandleBlur = (name: "email" | "password", value: string) => {
    formDispatch({
      type: "TOUCH_FORM",
      payload: {
        name,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image style={{ width: 211, height: 47 }} source={Logotype} />
          </View>
          <Input
            label="Email"
            placeholder="ingrese su email"
            value={formState.fields.email.value}
            placeholderTextColor={COLORS.lightGrey}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => onHandleChange("email", text)}
            onBlur={(e) => onHandleBlur("email", e.nativeEvent.text)}
            hasError={formState.fields.email.hasError}
            error={formState.fields.email.error}
            touched={formState.fields.email.touched}
          />
          <Input
            label="Password"
            placeholderTextColor={COLORS.lightGrey}
            value={formState.fields.password.value}
            placeholder="Ingrese su contraseña"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => onHandleChange("password", text)}
            onBlur={(e) => onHandleBlur("password", e.nativeEvent.text)}
            hasError={formState.fields.password.hasError}
            error={formState.fields.password.error}
            touched={formState.fields.password.touched}
          />
          <Button
            title={messageAction}
            onPress={onHandleSubmit}
            disabled={!formState.formIsValid}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "AvenirBold",
    marginBottom: 18,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    // maxWidth: 400,
    padding: 12,
    paddingTop: 50,
    // margin: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    // borderRadius: 10,
    backgroundColor: "white",
  },
  prompt: {
    alignItems: "center",
  },
  promptMessage: {
    fontSize: 16,
    fontFamily: "Avenir",
    color: "#333",
  },
  promptButton: {
    fontSize: 16,
    fontFamily: "AvenirBold",
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginVertical: 20,
  },
});
