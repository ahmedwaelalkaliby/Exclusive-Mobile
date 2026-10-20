import { Image, StyleSheet, Text, View } from 'react-native';

export default function Footer() {
  return <View style={styles.footer}>
    <Text style={styles.brand}>Exclusive</Text>
    <Text style={styles.heading}>Download the app</Text>
    <Text style={styles.copy}>Save $3 with App New User Only</Text>
    <View style={styles.downloads}>
      <Image source={require('../../../assets/images/Qrcode1.png')} accessibilityLabel="App download QR code" style={styles.qr} />
      <View style={styles.badges}>
        <Image source={require('../../../assets/images/play-store.png')} accessibilityLabel="Get it on Google Play" resizeMode="contain" style={styles.badgeImage} />
        <Image source={require('../../../assets/images/appstore.png')} accessibilityLabel="Download on the App Store" resizeMode="contain" style={styles.badgeImage} />
      </View>
    </View>
    <Text style={styles.copy}>Support: exclusive@gmail.com · +88015-88888-9999</Text>
    <Text style={styles.copyright}>© Exclusive 2025. All rights reserved.</Text>
  </View>;
}

const styles = StyleSheet.create({ footer: { marginTop: 28, padding: 22, gap: 10, backgroundColor: '#111827' }, brand: { color: '#fff', fontWeight: '800', fontSize: 20 }, heading: { color: '#fff', fontWeight: '700', marginTop: 6 }, copy: { color: '#d1d5db', fontSize: 12, lineHeight: 18 }, downloads: { flexDirection: 'row', gap: 12, alignItems: 'center', marginVertical: 2 }, qr: { width: 68, height: 68, backgroundColor: '#fff', padding: 4 }, badges: { gap: 7 }, badgeImage: { width: 110, height: 34 }, copyright: { borderTopWidth: 1, borderTopColor: '#374151', paddingTop: 12, marginTop: 6, textAlign: 'center', color: '#9ca3af', fontSize: 11 } });
