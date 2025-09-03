import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Info</Text>
        <Text style={styles.subtitle}>App information & settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="phone-portrait" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color="#34C759" />
            <Text style={styles.infoLabel}>Build Date</Text>
            <Text style={styles.infoValue}>Dec 2024</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="code" size={20} color="#FF9500" />
            <Text style={styles.infoLabel}>React Native</Text>
            <Text style={styles.infoValue}>0.79.5</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle" size={20} color="#007AFF" />
          <Text style={styles.menuText}>Help & FAQ</Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="mail" size={20} color="#34C759" />
          <Text style={styles.menuText}>Contact Support</Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="document-text" size={20} color="#FF9500" />
          <Text style={styles.menuText}>Terms of Service</Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="shield-checkmark" size={20} color="#5856D6" />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            This is a demo wallet application built with React Native and React
            Navigation. It showcases a modern mobile wallet interface with
            transaction management, fund transfers, and user-friendly
            navigation.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#434447",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    marginTop: 5,
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#434447",
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: "#434447",
    marginLeft: 15,
  },
  infoValue: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#434447",
    marginLeft: 15,
  },
  aboutCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  aboutText: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
  },
});
