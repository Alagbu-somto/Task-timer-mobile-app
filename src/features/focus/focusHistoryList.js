import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const HistoryItem = ({item, index}) => {
    return <Text style={{  color: item.status > 1 ? "red" : "green",fontSize: spacing.md}} >{item.subject} </Text>;
  };

  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
         {!!focusHistory.length && (
      <>
        <Text style ={styles.title}> Things we have focused on</Text>
     
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
           <View style ={styles.clearContainer}>
      <RoundedButton size={75} title="clear" onPress={()=>{onClear()}} />
      </View>
          </>
        )}
      </SafeAreaView>
     
    </>
  );
};

const styles = StyleSheet.create({
  title:{
     color: "white",
    fontSize: spacing.lg
  },
  clearContainer:{
    alignItems : "center",
    padding: spacing.md
  }
});
