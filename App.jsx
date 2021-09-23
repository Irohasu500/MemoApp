import React from 'react';
import {} from 'react-native';

import MemoListScreen from './src/screens/MemoListScreen';
// import MemoDetailScreen from './src/screens/MemoDetailScreen';

// 変数が定義される前に使用されている。
export default function App() {
  return <MemoListScreen />;
}
