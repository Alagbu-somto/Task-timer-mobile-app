import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { RoundedButton } from './RoundedButton';
export const Timing = ({ OnChangeTime  }) => {
  return (
    <>
      <View style={styles.timeingButton}>
        <RoundedButton size={75} title="10" onPress={() => OnChangeTime (10)} />
      </View>
      <View style={styles.timeingButton}>
        <RoundedButton
          size={75}
          title="20"
          onPress={() => {
            OnChangeTime (20);
          }}
        />
      </View>
      <View style={styles.timeingButton}>
        <RoundedButton
          size={75}
          title="30"
          onPress={() => {
            OnChangeTime (30);
          }}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  timeingButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
