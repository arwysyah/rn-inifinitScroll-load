import React from "react";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
class InfiniteScroll extends React.Component {
  constructor() {
    super();
    this.state = {
      itemRender: 0,
      loadingList: false,
      marginTop: 20,
    };
  }

  handleScroll = (e) => {
    console.log(this.state.itemRender);
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrolledBottom = scrollViewHeight + scrollPosition;

    if (
      isScrolledBottom >= contentHeight - 50 &&
      this.props.limit <= this.props.data.length
    ) {
      setTimeout(() => {
        this.props.booleanFunc();
        this.setState({
          loadingList: true,
        });
      });
    } else {
      this.setState({ loadingList: false });
    }
  };

  render() {
    return (
      <View>
        {this.state.loadingList === true && (
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              alignSelf: "center",
              top: "80%",
            }}
          >
            <ActivityIndicator size="large" color="#D23B4B" />
          </View>
        )}
        <FlatList
          scrollEventThrottle={16}
          contentContainerStyle={styles.container}
          initialNumToRender={5}
          onMomentumScrollEnd={(e) => this.handleScroll(e)}
          showsVerticalScrollIndicator={false}
          data={this.props.data}
          renderItem={this.props.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});
export default InfiniteScroll;
