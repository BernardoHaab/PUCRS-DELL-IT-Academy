import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },
}));

export default useStyles;
