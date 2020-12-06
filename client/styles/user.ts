import { StyleSheet } from "react-native"

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  wrapperImg: {
    position: "relative",
    marginVertical: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 5,
  },
  userIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    textAlign: "center",
    lineHeight: 50,
    backgroundColor: "whitesmoke",
  },
  info: {
    borderTopWidth: 1,
    borderColor: "lightgrey",
    paddingTop: 15,
  },
  infoItem: {
    borderTopWidth: 1,
    borderColor: "lightgrey",
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
  },
  infoTitle: {
    color: "grey",
  },
  infoContent: {
    color: "#333",
    fontWeight: "bold",
    paddingLeft: 5,
  },
  infoContentDate: {
    color: "#333",
    fontWeight: "bold",
    paddingLeft: 10,
    fontSize: 17,
  },
  infoTitleDate: {
    fontSize: 17,
    color: "grey",
  },
  btns: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
})
