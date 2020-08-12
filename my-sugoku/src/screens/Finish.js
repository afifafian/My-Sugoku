import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";

const Finish = ({ navigation, route }) => {
    const { playerName, level, timeRecord } = route.params
    const toHome = () => {
        navigation.navigate("Home")
    }
    return (
        <View style={styles.container}>
            <View style={{marginBottom: 10}}>
                <Text style={[ {fontSize: 25} ,styles.text]} >Congratulations {playerName}! </Text>
                <Text style={styles.text} >Level accomplished: {level} </Text>
                <Text style={styles.text} >Your Time is: {timeRecord}</Text>
                <Text style={styles.text} >Well Done! </Text>
            </View>
            <Image
                style={[{ width: 50, height: 50 }, styles.image]} 
                source={{uri: "https://www.designnominees.com/application/upload/Apps/2016/08/sudoku-puzzles-123.png"}}
            />
            <TouchableOpacity onPress={toHome}>
                <Text style={styles.text} >Play Again?</Text>
            </TouchableOpacity>
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
    text: {
        alignSelf: "center",
        marginBottom: 10,
        fontWeight: "bold"
    },
    image: {
        marginBottom: 40  
    },
});

export default Finish;