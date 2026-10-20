import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}><Header />{scroll ? <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>{children}<Footer /></ScrollView> : <View style={styles.fill}>{children}</View>}</SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#fff' }, fill: { flex: 1 }, content: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 28 } });
