import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleVerifyLogin = async () => {
    setStatus("");
    setShowLogin(false);

    const req = await fetch("https://api.b7web.com.br/loginsimples/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/" },
    });

    const json = await req.json();

    if (json.status === "ok") {
      setStatus("Acesso LIBERADO!");
      setShowLogin(true);
    } else {
      setStatus("Acesso NEGADO!");
      setShowLogin(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent={false} />
      <Text style={styles.header}>Faça Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite se e-mail"
        placeholderTextColor="#FFF"
        value={email}
        onChangeText={(t) => setEmail(t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#FFF"
        value={password}
        onChangeText={(t) => setPassword(t)}
        secureTextEntry={true}
      />
      <Button title="Verificar" onPress={handleVerifyLogin} />

      <Text style={styles.status}>{status}</Text>

      {showLogin && (
        <View style={styles.loginArea}>
          <Text style={styles.login}>Login Valido</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    color: "#FFF",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    fontSize: 18,
    color: "#FFF",
    backgroundColor: "#555",
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
  },
  status: {
    margin: 50,
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
  loginArea: {
    backgroundColor: "#FFF",
    borderBottomEndRadius: 5,
    padding: 20,
  },
  login: {
    fontSize: 18,
    textAlign: "center",
  },
});
