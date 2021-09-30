import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

// firestoreはfirebaseの一部
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');

  function handlePress() {
    // 現在ログインしているユーザーを取得
    const { currentUser } = firebase.auth();
    // 参照を作る
    const db = firebase.firestore();
    // ユーザーごとにデータを保存
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    ref.add({
      bodyText,
      updatedAt: new Date(),
    })
      .then((docRef) => {
        console.log('Created!', docRef.id);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }
  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
