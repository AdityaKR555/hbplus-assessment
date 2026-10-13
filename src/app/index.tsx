// src/app/index.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  // If already logged in, go straight to dashboard
  if (user) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, isDesktop && styles.desktopContainer]}>
        
        {/* Simple Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>HBPlus<Text style={styles.accentText}>.fit</Text></Text>
          <TouchableOpacity 
            style={styles.navLoginBtn} 
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.navLoginText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Elevating Daily Health & <Text style={styles.accentText}>Lifestyle</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Welcome to the HBPlus internal portal. Designed to empower our wellness community and manage team access securely.
          </Text>

          <TouchableOpacity 
            style={styles.ctaButton} 
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>Open Staff Portal</Text>
          </TouchableOpacity>
        </View>

        {/* Simple Minimalist Focus Cards */}
        <View style={[styles.grid, isDesktop && styles.desktopGrid]}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Secure Authentication</Text>
            <Text style={styles.cardDesc}>Protected Google Sign-In restricted exclusively to official team members.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Role Management</Text>
            <Text style={styles.cardDesc}>Seamlessly handles administrative clearance and user profiles.</Text>
          </View>
        </View>

        {/* Clean Footer without fake copyright notices */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>HBPlus Team Portal • Built for Internship Evaluation</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#0B0F17' },
  container: { flex: 1, padding: 24, maxWidth: 900, alignSelf: 'center', width: '100%', justifyContent: 'space-between', minHeight: '100%' },
  desktopContainer: { paddingHorizontal: 40, paddingVertical: 40 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logoText: { fontSize: 22, fontWeight: '700', color: '#F8FAFC', letterSpacing: -0.5 },
  accentText: { color: '#38BDF8' },
  navLoginBtn: { backgroundColor: '#1E293B', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  navLoginText: { color: '#F8FAFC', fontSize: 13, fontWeight: '500' },
  heroSection: { alignItems: 'center', textAlign: 'center', marginVertical: 60 },
  heroTitle: { fontSize: 32, fontWeight: '800', color: '#F8FAFC', textAlign: 'center', maxWidth: 650, lineHeight: 42, marginBottom: 16 },
  heroSubtitle: { fontSize: 15, color: '#94A3B8', textAlign: 'center', maxWidth: 520, lineHeight: 22, marginBottom: 32 },
  ctaButton: { backgroundColor: '#38BDF8', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  ctaButtonText: { color: '#0F172A', fontSize: 15, fontWeight: '600' },
  grid: { gap: 16, marginBottom: 40 },
  desktopGrid: { flexDirection: 'row' },
  card: { flex: 1, backgroundColor: '#161E2E', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#1E293B' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#F8FAFC', marginBottom: 6 },
  cardDesc: { fontSize: 13, color: '#94A3B8', lineHeight: 18 },
  footer: { borderTopWidth: 1, borderTopColor: '#1E293B', paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#64748B', fontSize: 12 },
});