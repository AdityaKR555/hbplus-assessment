// src/app/(tabs)/dashboard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Redirect } from 'expo-router'; // <-- ADD THIS IMPORT
import { useAuth } from '../../context/AuthContext';

export default function DashboardScreen() {
  const { user, userProfile, signOut, loading } = useAuth();

  // If user is not logged in and not loading, redirect to login
  if (!loading && !user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        
        {/* Header Profile Section */}
        <View style={styles.profileHeader}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitial}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}

          <View style={styles.userInfo}>
            <Text style={styles.displayName}>{user?.displayName || 'Team Member'}</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>
        </View>

        {/* Status & Role Badges */}
        <View style={styles.badgeContainer}>
          <View style={styles.domainBadge}>
            <Text style={styles.domainBadgeText}>✓ Domain Verified (@hbplus.fit)</Text>
          </View>

          <View style={[
            styles.roleBadge, 
            userProfile?.role === 'Admin' ? styles.adminBadge : styles.userBadge
          ]}>
            <Text style={styles.roleBadgeText}>Role: {userProfile?.role || 'User'}</Text>
          </View>
        </View>

        {/* Firestore Metadata Details */}
        <View style={styles.detailsBox}>
          <Text style={styles.detailsTitle}>Database Record (Firestore)</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>User ID:</Text>
            <Text style={styles.detailValue} numberOfLines={1}>{user?.uid}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Session:</Text>
            <Text style={styles.detailValue}>
              {userProfile?.lastLogin ? new Date(userProfile.lastLogin).toLocaleTimeString() : 'Active'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#0B0F17', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 460, backgroundColor: '#161E2E', borderRadius: 20, padding: 32, borderWidth: 1, borderColor: '#1E293B' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  avatarFallback: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#38BDF8', justifyContent: 'center', alignItems: 'center' },
  avatarInitial: { color: '#0F172A', fontSize: 22, fontWeight: '700' },
  userInfo: { flex: 1 },
  displayName: { fontSize: 20, fontWeight: '700', color: '#F8FAFC', marginBottom: 4 },
  emailText: { fontSize: 14, color: '#94A3B8' },
  badgeContainer: { flexDirection: 'row', gap: 10, marginBottom: 24, flexWrap: 'wrap' },
  domainBadge: { backgroundColor: 'rgba(56, 189, 248, 0.1)', borderWidth: 1, borderColor: '#38BDF8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  domainBadgeText: { color: '#38BDF8', fontSize: 12, fontWeight: '600' },
  roleBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  adminBadge: { backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: '#FBBF24' },
  userBadge: { backgroundColor: 'rgba(148, 163, 184, 0.1)', borderColor: '#94A3B8' },
  roleBadgeText: { color: '#F8FAFC', fontSize: 12, fontWeight: '600' },
  detailsBox: { backgroundColor: '#0F172A', padding: 16, borderRadius: 12, marginBottom: 28, borderWidth: 1, borderColor: '#1E293B' },
  detailsTitle: { color: '#64748B', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', marginBottom: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { color: '#94A3B8', fontSize: 13 },
  detailValue: { color: '#F8FAFC', fontSize: 13, fontWeight: '500', maxWidth: 220 },
  logoutButton: { backgroundColor: '#EF4444', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});



