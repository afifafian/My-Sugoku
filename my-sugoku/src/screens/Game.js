import React from "react";
import {StyleSheet, View} from "react-native";
import Board from '../components/Board';

const Game = () => {
    return (
        <View style={styles.container}>
            <Board/>
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
});

export default Game;