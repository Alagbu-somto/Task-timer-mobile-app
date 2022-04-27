import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { color } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { CountDownTimer } from '../../components/countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from '../../components/timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timmer = (props) => {
  useKeepAwake();
  const defaultTime = 0.1;
  const [minutes, setMinutes] = useState(defaultTime);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const Vibrate = () => {
    if (Platform === 'ios') {
      const interval = setInterval(() => Vibration.vibrate, 1000);
      setTimeout(() => clearInterval(interval, 10000));
    } else {
      Vibration.vibrate(1000);
    }
  };
  const onEnd = () => {
    Vibrate();
    setMinutes(defaultTime);
    setProgress(1);
    setIsStarted(false);
    props.onTimerEnd()
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDownTimer
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: spacing.xxl, paddingBottom: spacing.md }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{props.focusObject}</Text>
      </View>
      <ProgressBar style={{ height: 12 }} progress={progress} />
      <View style={styles.buttonWrapper}>
        <Timing OnChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="Pause" onPress={() =>setIsStarted(false) } />
        )}
      </View>
      <View>
       <RoundedButton title="-" size={50} onPress={() =>props.clearSubject() } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: color.white,
    textAlign: 'center',
  },
  task: {
    color: color.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
});
