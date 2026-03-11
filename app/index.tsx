import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 40 }}>
      {/* Status */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>
          {winner ? `Winner: ${winner}` : `Next: ${isXNext ? "X" : "O"}`}
        </Text>
      </View>

      {/* Game grid - 3x3 */}
      {[0, 1, 2].map((row) => (
        <View
          key={row}
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <View
                key={col}
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                }}
              >
                <Button
                  title={board[index] || " "}
                  onPress={() => handlePress(index)}
                  color={board[index] === "X" ? "blue" : "red"}
                />
              </View>
            );
          })}
        </View>
      ))}

      {/* Reset button */}
      <View style={{ marginTop: 30 }}>
        <Button title="Reset Game" onPress={resetGame} color="green" />
      </View>
    </View>
  );
}

// Helper function
function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
