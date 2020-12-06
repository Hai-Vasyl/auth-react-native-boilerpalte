import { StyleSheet } from "react-native"

export default StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
  },
  imgLink: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 100 / 2,
  },
  imgAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  iconUser: {
    position: "absolute",
    bottom: 4,
    right: 4,
    borderWidth: 1,
    borderColor: "lightgrey",
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    textAlign: "center",
    lineHeight: 30,
    backgroundColor: "whitesmoke",
    fontSize: 20,
  },
  info: {
    paddingLeft: 10,
  },
  infoUsername: {
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
})
