import React, {useState} from "react";
import {StyleSheet, View, Text, TextInput, Button, Image} from "react-native";
import {useDispatch} from "react-redux"
import {getPlayer} from '../store/actions/playerAction';

const Home = ({navigation}) => {
    const welcome = "Welcome\nMy-Sudoku App!"
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const toGame = () => {
        let playerName = name
        if (!playerName || playerName === "") {
            alert("name must be filled!")
        } else {
            dispatch(getPlayer(playerName))
            navigation.navigate("My-Sudoku App")
            setName("")
        }
    }
    return (
        <View style={styles.container}>
            <View style={{marginBottom: 10}}>
                <Text style={styles.welcome}>Welcome</Text>
                <Text style={styles.welcome}>My-Sudoku App!</Text>
            </View>
            <Image
                style={[{ width: 50, height: 50 }, styles.image]} 
                source={{uri: "https://www.designnominees.com/application/upload/Apps/2016/08/sudoku-puzzles-123.png"}}
            />
            <Text style={styles.inputValue} >Please Input your Name before Start Playing!</Text>
            <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                style={styles.value}
                placeholder="Enter Name"
                placeholderTextColor="black"
            ></TextInput>
            <Button title="Let's Play!" onPress={toGame}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'aquamarine',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcome: {
        alignSelf: "center",
        fontSize: 25,
        marginBottom: 10,
        fontWeight: "bold"
    },
    image: {
        marginBottom: 40
    },
    inputValue: {
        fontWeight: "bold",
        marginBottom: 10
    },
    value: {
        fontSize: 15,
        color: "#0f0f0f",
        width: 200,
        height: 40,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 20,
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: "black",
    },
});

export default Home;