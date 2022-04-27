import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import {spacing} from "../../utils/sizes"
export const Focus = ({ addSubject }) => {
  const [item, setItem] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.input}>
          <TextInput
            style={{ flex: 1 }}
            // onSubmitEditing={(event) => {
            //   setItem(event.nativeEvent.text);}}
               onChangeText={text=> setItem(text)}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(item);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: spacing.lg,
    fontWeight: "bold"
  },
  input: {
    marginTop: spacing.md,
    flexDirection: 'row',
  },
});
