import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '../utils/sizes';
import { color } from '../utils/colors';

const minToMiliSec = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const CountDownTimer = ({
  minutes = 1,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const [mil, setMil] = useState(minToMiliSec(null));

  const interval = React.useRef(null);
  const CountDown = () => {
    setMil((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      
      return timeLeft;
    });
  };

  useEffect(() => {
    setMil(minToMiliSec(minutes));
  }, [minutes]);

useEffect(() => {
   onProgress(mil / minToMiliSec(minutes));
  }, [mil]);


  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(CountDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(mil / 1000 / 60) % 60;
  const sec = Math.floor(mil / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}: {formatTime(sec)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: spacing.xxxl,
    fontWeight: 'bold',
    color: color.white,
    padding: spacing.lg,
    backgroundColor: color.rgb,
    textAlign: 'center',
  },
});
