// src/app/(auth)/login.tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ActivityIndicator, 
  useWindowDimensions,
  ScrollView 
} from 'react-native';
import { Redirect, useRouter } from 'expo-router'; // <-- ADD Redirect & useRouter
import { useAuth } from '../../context/AuthContext';
import Svg, { Path } from 'react-native-svg';

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <Path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <Path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <Path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </Svg>
  );
}

export default function LoginScreen() {
  const { user, signInWithGoogle, loading, error } = useAuth();
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  // CRITICAL FIX: If user is authenticated, automatically redirect to Dashboard!
  if (user) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, isDesktop && styles.desktopContainer]}>
        
        {/* Left / Brand Section */}
        <View style={[styles.heroSection, isDesktop && styles.desktopHero]}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Internal Employee Portal</Text>
          </View>
          <Text style={styles.brandTitle}>HBPlus<Text style={styles.accentText}>.fit</Text></Text>
          <Text style={styles.brandSubtitle}>
            Secure corporate gateway for authorized personnel and team administration.
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✦ Single Sign-On (SSO) with Domain Protection</Text>
            <Text style={styles.featureItem}>✦ Automated Role-Based Dashboard Access</Text>
            <Text style={styles.featureItem}>✦ Secure Multi-Platform Session Management</Text>
          </View>
        </View>

        {/* Right / Login Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign In</Text>
            <Text style={styles.cardSubtitle}>Use your official corporate Google account</Text>

            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TouchableOpacity 
              style={styles.googleButton} 
              onPress={signInWithGoogle}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#0F172A" />
              ) : (
                <View style={styles.buttonContent}>
                  <GoogleIcon />
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.domainNotice}>
              <Text style={styles.domainNoticeText}>
                Access is restricted to verified <Text style={styles.domainHighlight}>@hbplus.fit</Text> domain emails only.
              </Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#0B0F17' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  desktopContainer: { flexDirection: 'row', justifyContent: 'space-between', maxWidth: 1100, alignSelf: 'center', width: '100%', gap: 60 },
  heroSection: { marginBottom: 40, alignItems: 'flex-start', maxWidth: 480 },
  desktopHero: { marginBottom: 0, justifyContent: 'center' },
  badge: { backgroundColor: '#1E293B', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  badgeText: { color: '#38BDF8', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  brandTitle: { fontSize: 42, fontWeight: '800', color: '#F8FAFC', letterSpacing: -1, marginBottom: 12 },
  accentText: { color: '#38BDF8' },
  brandSubtitle: { fontSize: 16, color: '#94A3B8', lineHeight: 24, marginBottom: 24 },
  featureList: { gap: 10 },
  featureItem: { color: '#CBD5E1', fontSize: 14, fontWeight: '500' },
  cardWrapper: { width: '100%', maxWidth: 420 },
  card: { backgroundColor: '#161E2E', borderRadius: 20, padding: 32, borderWidth: 1, borderColor: '#1E293B', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20 },
  cardTitle: { fontSize: 24, fontWeight: '700', color: '#F8FAFC', marginBottom: 6 },
  cardSubtitle: { fontSize: 14, color: '#94A3B8', marginBottom: 28 },
  errorBox: { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 20 },
  errorText: { color: '#FCA5A5', fontSize: 13, lineHeight: 18, textAlign: 'center' },
  googleButton: { backgroundColor: '#F8FAFC', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  googleButtonText: { color: '#0F172A', fontSize: 15, fontWeight: '600' },
  domainNotice: { marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#1E293B', alignItems: 'center' },
  domainNoticeText: { fontSize: 12, color: '#64748B', textAlign: 'center', lineHeight: 18 },
  domainHighlight: { color: '#38BDF8', fontWeight: '600' },
});