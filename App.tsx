import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <AppScreen />
      </QueryClientProvider>
  );
}


function AppScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
          fetch('https://api.github.com/repos/Saint-Cyr-Dev/YoutubeCloneApp').then(res =>
              res.json()
          )
  });

  useEffect(() => {
      const fetchData = async () => {
          setRefreshing(true);
          await refetch();
          setRefreshing(false);
      };

      fetchData();
  }, [refetch]);

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: {error.message}</Text>;

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Projet GitHub</Text>
          <FlatList
              data={[data]}
              renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                      <Text style={styles.name}>Name: {item.name}</Text>
                      <Text style={styles.language}>langage: {item.language}</Text>
                      <Text style={styles.updated_at}>Derniere mise à jour: {item.updated_at}</Text>
                      <Text style={styles.created_at}>Date de creation: {item.created_at}</Text>
                      <Text style={styles.id}>ID: {item.id}</Text>
                  </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={refetch} />
              }
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  itemContainer: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      elevation: 2,
  },
  name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  language: {
      fontSize: 16,
      marginBottom: 5,
  },
  updated_at: {
      fontSize: 16,
      marginBottom: 5,
  },
  created_at: {
      fontSize: 16,
      marginBottom: 5,
  },
  id: {
      fontSize: 16,
      marginBottom: 5,
  },
});





























