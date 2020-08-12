import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {setBoard, updateValue, levelDifficulty, validateGame, solvedBoard} from '../store/actions/boardAction';
import {useNavigation} from "@react-navigation/native"

const Board = () => {
    const [play, setPlay] = useState(false);
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { boards, boardTemplate, status, level, loading } = useSelector((state) => state.boardReducer)
    const { playerName } = useSelector((state) => state.playerReducer)
    
    const getTimer = (time) => {
        const mins = Math.floor(time/60);
        const secs = time - (mins*60);
        return {minute: `0${mins}`.slice(-2), seconds: `0${secs}`.slice(-2)} 
    }
    const { minute, seconds } = getTimer(count)

    useEffect(() => {
        let interval;
        if (play) {
            interval = setInterval(() => {
                setCount((count) => count + 1)
            }, 1000);
        } else if (!play && count !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    },[play, count])

    useEffect(() => {
        dispatch(setBoard(level))
        setPlay(!play)
    },[dispatch])

    const updateBoard = (input, rowIdx, colIdx) => {
        boards[rowIdx][colIdx] = +input
        dispatch(updateValue(boards))
    }

    const setLevel = (newLevel) => {
        setCount(0)
        setPlay(false)
        setPlay(true)
        dispatch(setBoard(newLevel))
        dispatch(levelDifficulty(newLevel))
    }
    const solve = () => {
        setPlay(false)
        const result = {boardTemplate}
        dispatch(solvedBoard(result))
    }
    const validate = () => {
        if (status === "solved") {
            setPlay(false)
        }
        const result = {boards}
        dispatch(validateGame(result))
    }
    const toFinish = () => {
        if (status === "solved") {
            navigation.navigate("Finish", {
                playerName,
                level,
                timeRecord: `${minute}:${seconds}`
            })
        } else {
            alert("Incorrect Answer!\n(note:\nDon't forget to Check Answer before submit)")
        }
    }

    if (loading) {
        return (
            <View>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Please Wait...</Text>
            </View>
        )
    }
    return (
        <View style={{backgroundColor: "aquamarine"}}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello, {playerName}!</Text>
            </View>
            <View style={styles.levelGroup}>
                <TouchableOpacity onPress={() => setLevel("easy")} >
                    <Text style={styles.easy}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLevel("medium")}>
                    <Text style={styles.medium}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLevel("hard")}>
                    <Text style={styles.hard}>Hard</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontWeight: "bold", marginBottom: 5, alignSelf: "center"}}>Timer: {`${minute}:${seconds}`} </Text>
            {boardTemplate.map((row, rowIdx) => (
            <View key={rowIdx} style={{ flexDirection: "row" }}>
                {row.map((col, colIdx) => {
                    if (col === 0) {
                        return (
                        <View key={colIdx} style={[styles.boxEmpty, styles.colBorder(rowIdx, colIdx)]}>
                            <TextInput
                            onChangeText={(input) => updateBoard(input, rowIdx, colIdx)}
                            keyboardType="numeric"
                            style={[styles.value]}
                            ></TextInput>
                        </View>
                        );
                    } else {
                        return (
                        <View key={colIdx} style={[styles.boxFilled, styles.colBorder(rowIdx, colIdx)]}>
                            <Text style={styles.emptyValue}>{col}</Text>
                        </View>
                        );
                    }
                })}
            </View>
            ))}
            
            <View style={{ flexDirection: "row", marginBottom: 20 , marginTop: 5}}>
                <Text style={styles.status}>Answer: {status}</Text>
                <Text style={styles.status}>Difficulty: {level}</Text>
            </View>
            <View style={styles.solve_finish}>
                <TouchableOpacity onPress={solve}>
                    <Text style={styles.solve}>Cheat?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={validate}>
                    <Text style={styles.validate}>Check Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toFinish}>
                    <Text style={styles.finish}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    solve_finish: {
        flexDirection: "row",
        justifyContent: "center",
    },
    solve: {
        backgroundColor:"#fa9c0f",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    validate: {
        backgroundColor: "#0f85fa",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    finish: {
        backgroundColor: "#7eafcc",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    levelGroup: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 12,
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        color: "black",
        fontWeight: "bold",
        marginBottom: 10
    },
    boxEmpty: {
        width: 35,
        height: 35,
        borderColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        backgroundColor: "#ffff",
    },
    boxFilled: {
        width: 35,
        height: 35,
        borderColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        backgroundColor: "skyblue",
    },
    colBorder: (rowIdx, colIdx) => ({
        borderLeftWidth: colIdx === 0 ? 2.3 : 1,
        borderRightWidth: (colIdx === 8 || (colIdx + 1) % 3 === 0) ? 2.3 : 0,
        borderTopWidth: rowIdx === 0 ? 2.3 : 1,
        borderBottomWidth: (rowIdx === 8 || (rowIdx + 1) % 3 === 0) ? 2.3 : 0,
    }),
    value: {
        fontSize: 15,
        width: 40,
        height: 40,
        textAlign: "center",
    },
    emptyValue: {
        fontSize: 15,
    },
    difficulty: {
        marginTop: 7,
        marginBottom: 5,
    },
    easy: {
        backgroundColor: "#23fa0f",
        padding: 6,
        borderRadius: 5,
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    medium: {
        backgroundColor: "#e0d01b",
        padding: 6,
        borderRadius: 5,
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    hard: {
        backgroundColor: "#de3412",
        padding: 6,
        borderRadius: 5,
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    random: {
        backgroundColor: "#6042f5",
        padding: 6,
        borderRadius: 5,
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    status: {
        color: "black",
        justifyContent: "center",
        fontWeight: "bold",
        marginBottom: 5,
        marginHorizontal: 25,
    },
    submit: {
        backgroundColor: "#03b6fc",
        borderRadius: 5,
        padding: 6,
        marginTop: 6,
        width: "30%"
    }
});

export default Board;