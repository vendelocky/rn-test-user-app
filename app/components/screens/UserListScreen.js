import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import Spacer from "../Spacer";
import { useNavigation } from "@react-navigation/core";
import text from "../../constants/text";
import { useFocusEffect } from "@react-navigation/native";
import StringifyAsyncStorage from "../StringifyAsyncStorage";
import storageKey from "../../constants/storageKey";
import { useSelector } from "react-redux";
import exitAlert from "../exitAlert";
import type from "../../constants/type";
import pageName from "../../constants/pageName";
import colors from "../../constants/colors";

const UserListScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [stopFetch, setStopFetch] = useState(false);
  const [inputText, setInputText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const searchInputText = useRef();
  const selector = useSelector(state => state);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (selector?.Reducer?.status === type.ISLOGGEDIN) {
          exitAlert();
        }
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [selector?.Reducer?.status])
  );

  useLayoutEffect(() => {
    const logOut = () => {
      StringifyAsyncStorage.removeItem(storageKey.TOKEN);
      navigation.canGoBack()
        ? navigation.goBack()
        : navigation.navigate(pageName.authenticator);
    };

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logOut}>
          <Text style={styles.headerButton}>{text.logout}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!shouldFetch || stopFetch) {
      return;
    }

    const fetchData = async () => {
      await fetch(`https://reqres.in/api/users?page=${page}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setRefreshing(false);
          setShouldFetch(false);
          setData((prevData) => [...prevData, ...responseJson.data]);
          setMasterData((prevData) => [...prevData, ...responseJson.data]);
          setPage(page + 1);

          if (!responseJson.data.length) {
            setStopFetch(true);
          }
        })
        .catch((error) => {
          setShouldFetch(false);
          console.error(error);
        });
    };

    fetchData();
  }, [page, shouldFetch, stopFetch]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  const searchData = (searchedText) => {
    if (searchedText) {
      const newData = masterData.filter((item) => {
        const itemData =
          item.first_name.toUpperCase() + " " + item.last_name.toUpperCase();
        const textData = searchedText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    } else {
      setData(masterData);
    }
  };

  const refetch = () => {
    setRefreshing(true);
    setPage(1);
    setShouldFetch(true);
    setStopFetch(false);
    setData([]);
    setMasterData([]);
    setInputText("");
    searchInputText.current.clear();
  };

  const userCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.image}
          resizeMode={"cover"}
        />
        <View style={styles.itemContainer}>
          <Text style={styles.name}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.searchContainer}>
        <TextInput
          ref={searchInputText}
          style={[styles.SearchBox, styles.searchItems]}
          placeholder={text.searchPlaceholder}
          placeholderTextColor={colors.grey}
          onChangeText={(newText) => setInputText(newText)}
        />
        <TouchableOpacity
          style={[styles.button, styles.searchItems]}
          onPress={() => searchData(inputText)}
        >
          <Text style={styles.searchButton}>{text.searchButton}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.listContainer}
        data={data}
        renderItem={userCard}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Spacer height={8} />}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Spacer height={24} />}
        onRefresh={refetch}
        refreshing={refreshing}
      />
      {data.length === 0 && !shouldFetch && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{text.noResult}</Text>
        </View>
      )}
      {shouldFetch && !stopFetch && (
        <ActivityIndicator size={"large"} color={colors.blue} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },

  headerButton: {
    color: colors.blue,
    fontSize: 16,
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
  },

  searchItems: {
    borderColor: colors.grey,
    borderWidth: 1,
    height: 44,
    margin: 16,
    color: colors.black,
  },

  SearchBox: {
    flex: 1,
    marginRight: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 16,
  },

  button: {
    marginLeft: 0,
    paddingHorizontal: 24,
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  searchButton: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },

  listContainer: {
    padding: 16,
    backgroundColor: colors.white,
  },

  itemContainer: {
    flex: 1,
    paddingVertical: 8,
    borderColor: colors.grey,
    borderBottomWidth: 1,
  },

  card: {
    flexDirection: "row",
  },

  image: {
    marginRight: 16,
    width: 60,
    height: 60,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    borderRadius: 50,
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.black,
  },

  email: {
    color: colors.darkGrey,
    paddingVertical: 8,
  },

  empty: {
    marginTop: 74,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 16,
    color: colors.black,
  },
});

export default UserListScreen;
