// // src/app/_layout.tsx
// import React, { useEffect } from 'react';
// import { Stack, useRouter, useSegments } from 'expo-router';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { ActivityIndicator, View, StyleSheet } from 'react-native';

// function RootLayoutNav() {
//   const { user, loading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (loading) return;

//     // Check if current route is inside the (auth) group
//     const inAuthGroup = segments[0] === '(auth)';

//     if (!user && !inAuthGroup) {
//       // Unauthenticated -> redirect to login
//       router.replace('/login');
//     } else if (user && inAuthGroup) {
//       // Authenticated -> redirect to dashboard
//       router.replace('/dashboard');
//     }
//   }, [user, loading, segments]);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#38BDF8" />
//       </View>
//     );
//   }

//   return <Stack screenOptions={{ headerShown: false }} />;
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RootLayoutNav />
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0B0F17',
//   },
// });

// src/app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}