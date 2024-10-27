import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

type RootStackParamList = {
  Pay: undefined;
  Receive: undefined;
  Balance: undefined;
  SelfTransfer: undefined;
};

type ActionProps = {
  icon: IoniconsName;
  label: string;
  navigateTo: keyof RootStackParamList; // Updated prop to use navigation
};

type TransactionProps = {
  name: string;
  date: string;
  amount: string;
  image: any;
};

const ActionButton: React.FC<ActionProps> = ({ icon, label, navigateTo }) => {
  const navigation = useNavigation(); // Hook for navigation

  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() => navigation.navigate(navigateTo as never)}
    >
      <View style={styles.actionIconContainer}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const TransactionItem = ({ name, date, amount, image }: TransactionProps) => (
  <View style={styles.transactionItem}>
    <Image source={image} style={styles.transactionAvatar} />
    <View style={styles.transactionInfo}>
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <Text style={styles.transactionAmount}>₹{amount}</Text>
  </View>
);

export default function HomeScreen() {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation(); // Hook for navigation

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Scanner" as never)}
        >
          <Ionicons name="qr-code-outline" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
        />
        <Ionicons name="person-circle-outline" size={36} color="black" />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.illustration}>
          <Image
            style={{ width: width, height: 200, resizeMode: "contain" }}
            source={require("@/assets/images/parallaxBg.png")}
          />
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionButtons}>
            <ActionButton icon="arrow-up" label="Pay" navigateTo="Pay" />
            <ActionButton
              icon="arrow-down"
              label="Receive"
              navigateTo="Receive"
            />
            <ActionButton
              icon="wallet-outline"
              label="Balance"
              navigateTo="Balance"
            />
            <ActionButton
              icon="swap-horizontal"
              label="Self Transfer"
              navigateTo="SelfTransfer"
            />
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <TransactionItem
            name="Kaira"
            date="January 09, 2023 at 03:22 PM"
            amount="1,200"
            image={require("@/assets/images/icon.png")}
          />
          <TransactionItem
            name="Elly"
            date="January 09, 2023 at 03:22 PM"
            amount="2,250"
            image={require("@/assets/images/icon.png")}
          />
          <TransactionItem
            name="Alex"
            date="January 09, 2023 at 03:22 PM"
            amount="9,000"
            image={require("@/assets/images/icon.png")}
          />
          <TransactionItem
            name="Revan"
            date="January 09, 2023 at 03:22 PM"
            amount="5,100"
            image={require("@/assets/images/icon.png")}
          />
          <TransactionItem
            name="Scott"
            date="January 09, 2023 at 03:22 PM"
            amount="6,000"
            image={require("@/assets/images/icon.png")}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.voiceAssistantButton}
        onPress={() => navigation.navigate("VoiceComponent" as never)}
      >
        <Text style={styles.voiceAssistantText}>Voice Assistant</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    paddingTop: 60,
  },
  logo: {
    width: 40,
    height: 40,
  },
  illustration: {
    height: 200,
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8e44ad",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  actionLabel: {
    fontSize: 12,
  },
  transactionsContainer: {
    padding: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontWeight: "bold",
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  transactionAmount: {
    fontWeight: "bold",
  },
  voiceAssistantButton: {
    backgroundColor: "#8e44ad",
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 20,
    position: "absolute",
    bottom: 20,
    zIndex: 1,
  },
  voiceAssistantText: {
    color: "white",
    fontWeight: "bold",
  },
});
